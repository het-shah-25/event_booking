const Admin = require("../models/adminModel"); // Assuming you have an Admin model
const bcrypt = require("bcrypt");

exports.loginAdmin = async (req, res) => {
  const { admin_email, admin_password } = req.body;

  try {
    // Query the database for the admin using their email
    const admin = await Admin.findOne({ admin_email: admin_email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Use bcrypt to compare the submitted password with the stored hash
    const isMatch = await bcrypt.compare(admin_password, admin.admin_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Optionally, check any additional admin-specific conditions here
    // For example, admin role check if you have roles implemented

    // Respond with a success message or token
    res.status(200).json({
      message: "Login successful",
      admin_name: admin.admin_name,
      // You might also return a JWT or session token here
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
