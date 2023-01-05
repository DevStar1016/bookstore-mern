const asyncHandler = require("express-async-handler");
const { Book } = require("../models/bookModel");

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});

  res.json(books);
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Delete a Book
// @route   GET /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await book.remove();
    res.json({ message: "Book removed" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

module.exports = { getBooks, getBookById, deleteBook };
