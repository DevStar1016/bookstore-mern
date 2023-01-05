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

// @desc    Create a Book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    name: "Test",
    price: 0,
    user: req.user._id,
    image: "/images/8.jpg",
    author: "godot",
    genre: "Fiction",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @desc    Update a Book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const { name, price, description, image, author, genre, countInStock } =
    req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.name = name;
    book.price = price;
    book.description = description;
    book.image = image;
    book.author = author;
    book.genre = genre;
    book.countInStock = countInStock;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

module.exports = { getBooks, getBookById, deleteBook, createBook, updateBook };
