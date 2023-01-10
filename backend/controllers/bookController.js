const asyncHandler = require("express-async-handler");
const { Book } = require("../models/bookModel");

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const books = await Book.find({ ...keyword });

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
    name: "No name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    author: "No author",
    genre: "Unknown",
    countInStock: 0,
    numReviews: 0,
    description: "No description",
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

// @desc    Create new review
// @route   POST /api/books/:id/reivew
// @access  Private
const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Book already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    book.reviews.push(review);

    book.numReviews = book.reviews.length;

    book.rating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;

    await book.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

module.exports = {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
};
