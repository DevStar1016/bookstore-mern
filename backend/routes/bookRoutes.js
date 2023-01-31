const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
} = require("../controllers/bookController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.get("/", getBooks);
router.post("/", protect, admin, createBook);
router.post("/:id/reviews", protect, createBookReview);
router.get("/top", getTopBooks);
router.get("/:id", getBookById);
router.delete("/:id", protect, admin, deleteBook);
router.put("/:id", protect, admin, updateBook);

module.exports = router;
