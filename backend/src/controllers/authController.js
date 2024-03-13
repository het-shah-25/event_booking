const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.loginVendor = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    // Query using user_email
    const user = await User.findOne({ user_email: user_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isuservendor) {
      return res.status(403).json({ message: "Access denied. Not a vendor." });
    }

    res
      .status(200)
      .json({ message: "Login successful", user_name: user.user_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.registerUser = async (req, res) => {
  const { user_name, user_email, user_password, isuservendor } = req.body;

  try {
    let user = await User.findOne({ user_email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    user = new User({
      user_name,
      user_email,
      user_password: hashedPassword,
      isuservendor,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//write a api for login user only
exports.loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    // Query using user_email
    const user = await User.findOne({ user_email: user_email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the user is a vendor, and deny access if true
    // if (user.isuservendor) {
    //   return res
    //     .status(403)
    //     .json({ message: "Access denied. User is a vendor." });
    // }

    // Proceed with login since it's a valid user and not a vendor
    res
      .status(200)
      .json({ message: "Login successful", user_name: user.user_name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
