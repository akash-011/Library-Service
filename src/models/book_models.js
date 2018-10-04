const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  borrowCount: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
  },
  dateBorrowed: Date,
  returnDate: Date,
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
