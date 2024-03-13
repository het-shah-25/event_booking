const express = require("express");
const {
  loginVendor,
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginVendor);
router.post("/register", registerUser); // New registration route
router.post("/login/user", loginUser);

module.exports = router;
