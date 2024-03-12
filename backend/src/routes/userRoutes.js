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
//write a api for user login
router.post("/login/user", async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await User.findOne({ user_email: user_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ message: "Login successful", user_name: user.user_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//fetch user details by id
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
