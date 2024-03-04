// routes/highlightRoutes.js
const express = require('express');
// Import the Highlight model, assuming it's correctly defined in '../models/Highlight'
const Highlight = require('../models/Highlight');
const router = express.Router();

// Assuming mongoose is used in your Highlight model, no need to import it here unless directly used.

// Endpoint to save a new highlight
router.post('/highlights', async (req, res) => {
  try {
    // Create a new highlight document from the request body
    const highlight = new Highlight(req.body);
    // Save the highlight document to the database
    const savedHighlight = await highlight.save();
    // Respond with the saved document and HTTP status 201 (Created)
    res.status(201).json(savedHighlight);
  } catch (error) {
    // If an error occurs, respond with HTTP status 400 (Bad Request) and the error message
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to get highlights for a specific book
router.get('/highlights/:bookId', async (req, res) => {
  try {
    // Fetch highlights from the database that match the given bookId
    const highlights = await Highlight.find({ bookId: req.params.bookId });
    // Respond with the fetched highlights
    res.json(highlights);
  } catch (error) {
    // If an error occurs, respond with HTTP status 500 (Internal Server Error) and the error message
    res.status(500).json({ message: error.message });
  }
});

// Export the router to be used in server.js or other parts of the application
module.exports = router;
