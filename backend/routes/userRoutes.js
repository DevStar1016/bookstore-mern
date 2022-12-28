const express = require("express");
const router = express.Router();
const { authUser, getUserProfile } = require("../controllers/userController");
const { project } = require("../middlewares/authMiddleware");

router.post("/login", authUser);
router.get("/profile", project, getUserProfile);

module.exports = router;
