// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  filePath: String,
  // Any other details you want to store about the book
});

module.exports = mongoose.model('Book', bookSchema);
