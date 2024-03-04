// models/Highlight.js
const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  bookId: String, // Identifier for the book
  cfiRange: String, // The CFI range of the highlight
  text: String, // The text content of the highlight
  createdAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model('Highlight', highlightSchema);
