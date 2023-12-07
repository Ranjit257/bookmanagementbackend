import express from 'express';
import { Book } from '../models/bookModel.js';

const bookrouter = express.Router();

// Route for save a new book

bookrouter.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: 'send all required fields' });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

bookrouter.get('/', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.send({ message: error.message });
  }
});

bookrouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: 'Book not found' });
    } else {
      return res.status(201).send(book);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

bookrouter.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: 'send all fields' });
    }
    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: 'book not found' });
    } else {
      return res
        .status(200)
        .send({ message: 'book updated succcessfully', data: req.body });
    }
    return res
      .status(200)
      .send({ message: 'book updated succcessfully', data: req.body });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

//Route to delete a book
bookrouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send({ message: 'Book Not found' });
    } else {
      res.status(201).send({ message: 'book deleted successfully' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

export default bookrouter;
