const express = require("express");
const router = express.Router();
// Make sure the model name matches the exported name and the file name is correct
const Poll = require("../models/pollModel");

router.post("/createpoll", async (req, res) => {
  try {
    const { poll_question, poll_options } = req.body;
    // Directly use poll_options from req.body assuming it's in the correct format
    const poll = new Poll({
      poll_question,
      poll_options,
    });
    await poll.save();
    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/fetch-polls", async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete a poll by ID
router.delete("/delete-poll/:id", async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/vote/:pollId", async (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body; // Assume each option has a unique ID

  try {
    const poll = await Poll.findById(pollId);
    const option = poll.poll_options.find(
      (opt) => opt._id.toString() === optionId
    );
    if (option) {
      option.votes += 1; // Increment the vote count
      await poll.save();
      res.status(200).json({ message: "Vote added successfully" });
    } else {
      res.status(404).json({ message: "Option not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// API endpoint to fetch a specific poll by its ID
router.get("/:pollId", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found." });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
