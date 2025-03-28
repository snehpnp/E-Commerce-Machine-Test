const express = require("express");
const { register, login ,getProfile} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware"); // Assuming you have a middleware for token authentication

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile); // Protect this route with authMiddleware


module.exports = router;
