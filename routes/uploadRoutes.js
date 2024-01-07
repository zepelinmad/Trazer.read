// routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Make sure this folder exists
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.epub')
  }
});

const upload = multer({ storage: storage });

// Upload route
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // Handle the uploaded file here
    res.send('File uploaded successfully.');
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
