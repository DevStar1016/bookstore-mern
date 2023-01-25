const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);

module.exports = router;
