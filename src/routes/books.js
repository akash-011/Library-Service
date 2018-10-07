const express = require('express');
const { errors } = require('celebrate');
const Book = require('../models/book_models');
const { createBook, bookUpdate } = require('./book_validator');


const router = express.Router();

router.post('/', createBook, async (req, res) => {
  
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (ex) {
    res.send(ex.message);
  }

});

router.get('/', async (req, res) => {
  if (req.query.author) {
    const book = await Book.find({ author: req.query.author });
    return res.send(book);
  }
  if (req.query.publishYear) {
    let book = await Book.find({ publishYear: req.query.publishYear });
    return res.send(book);
  }
  try {
    const books = await Book.find();
    return res.send(books);
  } catch (ex) {
    res.send(ex.message);
  }
});

router.get('/:id', async (req, res) => {

  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send('Not found');
    res.send(book);
  } catch (ex) {
    res.status(500).send(ex.message);
  }


});

router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.deleteOne({ _id: req.params.id });
    res.send('Book Deleted');
  } catch (ex) {
    res.send(ex.message);
  }
});

router.put('/:id', bookUpdate, async (req, res) => {
  try {
    if (req.body.publishYear || req.body.pages) {
      let book = await Book.findById(req.params.id)
      book.publishYear = req.body.publishYear || book.publishYear;
      book.pages = req.body.pages || book.pages;
      await book.save()
      res.send(book);
    }; 
    res.send('No Update fields provided');
  } catch (ex) {
    res.send(ex.message)   
  };
});

router.put(':id/borrow', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) return res.send("Book not found")
    if (!book.isAvailable) {
      book.isAvailable = false;
      book.dateBorrowed = Date.now();
      book.returnDate = Date.now() + 7;
      book.borrowCount += 1;
      await book.save()
      res.status(200).send(book) 
    }
    return res.send('Book not available');
  } catch (ex) {
    res.send(ex.message)
  }
});

router.put(':id/return', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.isAvailable) {
      book.isAvailable = true;
      book.dateUpdated = Date.now();
    }
    return res.send('Book has not been borrowed')

  } catch (ex) {
    res.send(ex.message);
  }
});

module.exports = router;
