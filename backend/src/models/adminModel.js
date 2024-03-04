const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Admin schema
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

// Compile and export the Admin model
const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
