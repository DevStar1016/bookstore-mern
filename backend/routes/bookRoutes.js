const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
} = require("../controllers/bookController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.get("/", getBooks);
router.post("/", protect, admin, createBook);
router.get("/:id", getBookById);
router.delete("/:id", protect, admin, deleteBook);
router.put("/:id", protect, admin, updateBook);

module.exports = router;
