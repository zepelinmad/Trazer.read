const express = require('express');
const multer = require('multer');
const EPub = require('epub');
const Book = require('../models/Book'); // Ensure this path matches your project structure
const router = express.Router();

// Configure storage for file uploads
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
router.post('/upload', upload.single('file'), async (req, res) => { // Mark the callback as async
  if (!req.file) {
    return res.status(400).send({ error: 'File not provided' }); // Use return to exit early
  }

  const filePath = 'uploads/' + req.file.filename;
  const epub = new EPub(filePath);

  epub.on('end', async () => { // Mark this function as async to use await inside
    try {
      const title = epub.metadata.title || 'Unknown Title'; // Default title if not found

      // Create a new book document
      const newBook = new Book({
        title: title,
        filePath: filePath,
        // Add any other details you'd like to save
      });

      // Save the new book document using await
      const savedBook = await newBook.save();

      // Construct the URL for the uploaded file
      const fileUrl = `${req.protocol}://${req.get('host')}/${filePath}`;

      // Send the book ID and the file URL as response
      res.send({ bookId: savedBook._id.toString(), epubUrl: fileUrl });
    } catch (err) {
      console.error('Error saving book:', err);
      res.status(500).send({ error: 'Error saving book details' });
    }
  });

  epub.parse();
});

module.exports = router;