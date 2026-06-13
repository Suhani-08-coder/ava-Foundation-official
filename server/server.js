require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path'); 
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const Razorpay = require('razorpay');

const { buildReceipt } = require('./utils/pdfGenerator'); 

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'avaf_secure_node_secret';


// --- CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:5173', 
  'https://awadhvidyaarogyafoundation.org', 
  'https://www.awadhvidyaarogyafoundation.org'
];

app.use(cors({ 
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));


app.options('.*', cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({ folder: 'avaf_media', resource_type: 'auto' }),
});
const upload = multer({ storage }); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const Admin = mongoose.model('Admin', new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}));

const Donation = mongoose.model('Donation', new mongoose.Schema({
  name: String, email: String, amount: Number, transactionId: String,
  date: { type: Date, default: Date.now }, receiptSent: { type: Boolean, default: false }
}));

const Volunteer = mongoose.model('Volunteer', new mongoose.Schema({
  name: String, email: String, college: String, interest: String,
  certIssued: { type: Boolean, default: false }, joinedAt: { type: Date, default: Date.now }
}));

const GlobalStats = mongoose.model('GlobalStats', new mongoose.Schema({
  literacyImpact: { type: Number, default: 0 }, arogyaReach: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}));

const Media = mongoose.model('Media', new mongoose.Schema({
  title: String, type: { type: String, enum: ['photo', 'video'] }, url: String, publicId: String,
  category: { type: String, enum: ['vidya', 'arogya', 'mission', 'explore'], default: 'mission' },
  uploadedAt: { type: Date, default: Date.now }
}));

const Mission = mongoose.model('Mission', new mongoose.Schema({
  title: String, description: String, progress: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
}));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log(" AVAF Database Connected");
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({ userid: 'SUHANI_01', password: 'Suhani@2005', name: 'Suhani Yadav' });
      console.log("Default Admin created.");
    }
  })
  .catch(err => console.error(err));

// --- ROUTES ---

// [NEW] 3. Razorpay Order  Route
app.post('/api/donate/create-order', async (req, res) => {
  const { amount } = req.body; 
  try {
    const options = {
      amount: Number(amount) * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});


app.post('/api/donate/verify', async (req, res) => {
  const { name, email, amount, razorpay_payment_id } = req.body;
  try {
    
    const newDonation = await Donation.create({ 
      name, 
      email, 
      amount: Number(amount), 
      transactionId: razorpay_payment_id 
    });
    
    // Generate PDF
    const stream = [];
    buildReceipt(
      { name, email, amount, transactionId: razorpay_payment_id },
      (chunk) => stream.push(chunk),
      () => {
        const pdfBuffer = Buffer.concat(stream);
        const mailOptions = {
          from: `"AVAF Accounts" <${process.env.EMAIL_USER}>`,
          to: email, 
          subject: 'Donation Receipt - AVAF',
          html: `<h3>Namaste ${name},</h3><p>Thank you for donating <b>₹${amount}</b>.</p>`,
          attachments: [{ filename: `Receipt_${razorpay_payment_id}.pdf`, content: pdfBuffer, contentType: 'application/pdf' }]
        };
        transporter.sendMail(mailOptions, async (err) => {
          if (!err) { 
            newDonation.receiptSent = true; 
            await newDonation.save(); 
          }
          res.status(200).json({ success: true, message: "Receipt Sent" });
        });
      }
    );
  } catch (error) { 
    console.error("Verification Error:", error);
    res.status(500).json({ success: false, message: "Error processing payment verification" }); 
  }
});

app.get('/api/admin/donations', async (req, res) => res.json(await Donation.find().sort({ date: -1 })));

// Auth
app.post('/api/auth/login', async (req, res) => {
  const { userid, password } = req.body;
  const validUser = await Admin.findOne({ userid, password });
  if (validUser) {
    const token = jwt.sign({ userid: validUser.userid }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { name: validUser.name, userid: validUser.userid } });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

app.post('/api/admin/change-password', async (req, res) => {
  const { userid, oldPassword, newPassword } = req.body;
  const admin = await Admin.findOne({ userid, password: oldPassword });
  if (!admin) return res.status(400).json({ message: "Incorrect Old Password" });
  admin.password = newPassword;
  await admin.save();
  res.json({ message: "Success" });
});

app.post('/api/volunteers/signup', async (req, res) => res.status(201).json(await Volunteer.create(req.body)));
app.post('/api/admin/issue-cert/:id', async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id, 
      { certIssued: true }, 
      { new: true }
    );
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json({ success: true, volunteer });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.get('/api/admin/volunteers', async (req, res) => res.json(await Volunteer.find().sort({ joinedAt: -1 })));

app.get('/api/admin/impact-stats', async (req, res) => {
  let stats = await GlobalStats.findOne() || await GlobalStats.create({});
  res.json(stats);
});
app.post('/api/admin/update-impact', async (req, res) => res.json(await GlobalStats.findOneAndUpdate({}, req.body, { upsert: true, new: true })));

app.get('/api/missions', async (req, res) => res.json(await Mission.find().sort({ updatedAt: -1 })));
app.post('/api/admin/missions', async (req, res) => res.status(201).json(await Mission.create(req.body)));

app.get('/api/media', async (req, res) => res.json(await Media.find().sort({ uploadedAt: -1 })));
app.post('/api/admin/upload-media', upload.single('mediaFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });
    const newMedia = await Media.create({ ...req.body, url: req.file.path, publicId: req.file.filename });
    res.status(201).json(newMedia);
  } catch (err) { res.status(500).json({ message: "Upload failed" }); }
});

app.delete('/api/admin/media/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (media.publicId) await cloudinary.uploader.destroy(media.publicId, { resource_type: media.type === 'video' ? 'video' : 'image' });
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) { res.status(500).json({ message: "Delete failed" }); }
});

const frontendPath = path.join(__dirname, '../dist'); 

app.use(express.static(frontendPath));

app.use((req, res , next) => {
  if (req.path.startsWith('/api')) 
    return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});
app.listen(PORT, () => console.log(`🚀 Server Port ${PORT}`));