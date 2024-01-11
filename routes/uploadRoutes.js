const express = require('express');
const multer = require('multer');
const EPub = require('epub');
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.epub');
  },
});

const upload = multer({ storage: storage });

// Upload route
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('File not provided');
    }

    const filePath = 'uploads/' + req.file.filename;
    const epub = new EPub(filePath);

    epub.on('end', function() {
      // EPub is parsed, you can work with its content here
      console.log(epub.metadata); // Accessing metadata as an example

      // Construct the URL for the uploaded file
      const fileUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

      // Send the file URL as response
      res.send({ epubUrl: fileUrl });
    });

    epub.parse();
  } catch (err) {
    console.error('Error in file upload:', err);
    res.status(500).send({ error: 'Error uploading file' });
  }
});

module.exports = router;
