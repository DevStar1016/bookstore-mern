const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Book } = require("../models/bookModel");

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find({});

    res.json(books);
  })
);

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error("Book not found");
    }
  })
);

module.exports = router;
