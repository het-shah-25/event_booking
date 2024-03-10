const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    poll_question: { type: String, required: true },
    poll_options: [{ option: String, votes: { type: Number, default: 0 } }],
    poll_status: { type: String, default: "active" }, // Consider using a boolean here for simplicity, true for active, false for inactive
  },
  { timestamps: true }
);

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
