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

// Ensure this file exists in your utils folder
const { buildReceipt } = require('./utils/pdfGenerator'); 

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'avaf_secure_node_secret';

// --- MIDDLEWARE (Ab sahi order mein hai) ---
app.use(cors({ 
  origin: ['https://awadhvidyaarogyafoundation.org', 'https://www.awadhvidyaarogyafoundation.org', 'http://localhost:5173'],  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));
app.use(express.json());

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({ 
    folder: 'avaf_media', 
    resource_type: 'auto' 
  }),
});
const upload = multer({ storage }); 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// --- MODELS ---
const Admin = mongoose.models.Admin || mongoose.model('Admin', new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
}));

const Donation = mongoose.models.Donation || mongoose.model('Donation', new mongoose.Schema({
  name: String, email: String, amount: Number, transactionId: String,
  date: { type: Date, default: Date.now }, receiptSent: { type: Boolean, default: false }
}));

const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', new mongoose.Schema({
  name: String, email: String, college: String, interest: String,
  certIssued: { type: Boolean, default: false }, joinedAt: { type: Date, default: Date.now }
}));

const GlobalStats = mongoose.models.GlobalStats || mongoose.model('GlobalStats', new mongoose.Schema({
  literacyImpact: { type: Number, default: 0 }, arogyaReach: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
}));

const Media = mongoose.models.Media || mongoose.model('Media', new mongoose.Schema({
  title: String, type: { type: String, enum: ['photo', 'video'] }, url: String, publicId: String,
  category: { type: String, enum: ['vidya', 'arogya', 'mission', 'explore'], default: 'mission' },
  uploadedAt: { type: Date, default: Date.now }
}));

const Mission = mongoose.models.Mission || mongoose.model('Mission', new mongoose.Schema({
  title: String, description: String, progress: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
}));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("🚀 AVAF Database Connected");
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({ userid: 'SUHANI_01', password: 'Suhani@2005', name: 'Suhani Yadav' });
      console.log("✅ Default Admin created.");
    }
  })
  .catch(err => console.error("❌ MongoDB Error:", err));

// --- ROUTES ---

// 1. Donation
app.post('/api/donate', async (req, res) => {
  const { name, email, amount, transactionId } = req.body;
  try {
    const newDonation = await Donation.create({ name, email, amount, transactionId });
    const stream = [];
    buildReceipt(
      { name, email, amount, transactionId },
      (chunk) => stream.push(chunk),
      () => {
        const pdfBuffer = Buffer.concat(stream);
        const mailOptions = {
          from: `"AVAF Accounts" <${process.env.EMAIL_USER}>`,
          to: email, 
          subject: 'Donation Receipt - AVAF',
          html: `<h3>Namaste ${name},</h3><p>Thank you for donating <b>₹${amount}</b>.</p>`,
          attachments: [{ filename: `Receipt_${transactionId}.pdf`, content: pdfBuffer, contentType: 'application/pdf' }]
        };
        transporter.sendMail(mailOptions, async (err) => {
          if (!err) { 
            newDonation.receiptSent = true; 
            await newDonation.save(); 
          }
        });
        res.status(200).json({ success: true, message: "Receipt Processed" });
      }
    );
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

app.get('/api/admin/donations', async (_, res) => {
  try { res.json(await Donation.find().sort({ date: -1 })); }
  catch (e) { res.status(500).send(e.message); }
});

// 2. Auth
app.post('/api/auth/login', async (req, res) => {
  try {
    const { userid, password } = req.body;
    const validUser = await Admin.findOne({ userid, password });
    if (validUser) {
      const token = jwt.sign({ userid: validUser.userid }, JWT_SECRET, { expiresIn: '24h' });
      res.json({ token, user: { name: validUser.name, userid: validUser.userid } });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (e) { res.status(500).send(e.message); }
});

// 3. Volunteers
app.post('/api/volunteers/signup', async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    
    const mailOptions = {
      from: `"AVAF Team" <${process.env.EMAIL_USER}>`,
      to: volunteer.email, 
      subject: 'Welcome to AVAF - 2040 Vision',
      html: `<h3>Namaste ${volunteer.name},</h3>
             <p>Thank you for joining the <b>Awadh Vidya Arogya Foundation</b>.</p>
             <p>Our team will contact you soon regarding your interest in ${volunteer.interest}.</p>`
    };

 
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Critical Email Error:", err);
      } else {
        console.log("Email successfully sent:", info.response);
      }
    });

    res.status(201).json({ success: true, data: volunteer });

  } catch (error) {
    console.error("Database/Signup Error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});
   
app.get('/api/admin/volunteers', async (_, res) => {
  try { res.json(await Volunteer.find().sort({ joinedAt: -1 })); }
  catch (e) { res.status(500).send(e.message); }
});

// 4. Stats
app.get('/api/admin/impact-stats', async (_, res) => {
  try {
    let stats = await GlobalStats.findOne();
    if (!stats) stats = await GlobalStats.create({});
    res.json(stats);
  } catch (e) { res.status(500).send(e.message); }
});
app.post('/api/admin/update-impact', async (req, res) => {
  try { res.json(await GlobalStats.findOneAndUpdate({}, req.body, { upsert: true, new: true })); }
  catch (e) { res.status(500).send(e.message); }
});

// 5. Missions
app.get('/api/missions', async (_, res) => {
  try { res.json(await Mission.find().sort({ updatedAt: -1 })); }
  catch (e) { res.status(500).send(e.message); }
});

// 6. Media
app.get('/api/media', async (_, res) => {
  try { res.json(await Media.find().sort({ uploadedAt: -1 })); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/admin/upload-media', upload.single('mediaFile'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });
    const newMedia = await Media.create({ ...req.body, url: req.file.path, publicId: req.file.filename });
    res.status(201).json(newMedia);
  } catch (err) { res.status(500).json({ message: "Upload failed" }); }
});

// --- FRONTEND SERVING ---
const frontendPath = path.join(__dirname, '../dist');
app.use(express.static(frontendPath));


app.get(/^\/(?!api).*/, (_, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));