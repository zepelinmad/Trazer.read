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
    const filePath = 'uploads/' + req.file.filename;
    const epub = new EPub(filePath);

    epub.on('end', function() {
      // EPub is parsed, you can work with its content here
      console.log(epub.metadata); // Accessing metadata as an example

      res.send('File uploaded and parsed successfully.');
    });

    epub.parse();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
