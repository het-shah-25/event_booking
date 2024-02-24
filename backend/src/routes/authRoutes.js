const express = require("express");
const { loginVendor, registerUser } = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginVendor);
router.post("/register", registerUser); // New registration route

module.exports = router;
