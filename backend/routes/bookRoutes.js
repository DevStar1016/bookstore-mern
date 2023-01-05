const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
} = require("../controllers/bookController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.get("/", getBooks);
router.get("/:id", getBookById);
router.delete("/:id", protect, admin, deleteBook);

module.exports = router;
