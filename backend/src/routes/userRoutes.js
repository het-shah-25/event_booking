const express = require("express");
const router = express.Router();
const User = require("../models/userModel"); // Adjust the path to your User model

// Endpoint to fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
