const express = require("express");
const router = express.Router();
const { getBooks, getBookById } = require("../controllers/bookController");

router.get("/", getBooks);
router.get("/:id", getBookById);

module.exports = router;
 