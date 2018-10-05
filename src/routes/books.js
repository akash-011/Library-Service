const express = require('express');
const Book = require('../models/book_models');
const { validateBook } = require('./book_validator');
const router = express.Router();


router.post('/', async (req, res) => {
  const { error } = validateBook(req.body)
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    publishYear: req.body.publishYear,
    pages: req.body.pages,  
  });

  await book.save();
  res.status(201).send(book);
});

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
})

module.exports = router;
