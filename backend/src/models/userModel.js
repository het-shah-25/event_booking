const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_name: { type: String, required: true },
  user_email: { type: String, required: true, unique: true },
  user_password: { type: String, required: true },
  isuservendor: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
