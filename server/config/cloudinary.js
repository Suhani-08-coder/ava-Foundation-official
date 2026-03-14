// server/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avaf_media', // The folder name in your Cloudinary dashboard
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'],
    resource_type: 'auto', // Important for allowing both images and videos
  },
});

module.exports = { cloudinary, storage };