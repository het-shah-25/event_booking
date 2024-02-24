const express = require("express");
const multer = require("multer");
const Event = require("../models/eventRoutes"); // Corrected import path for the Event model

const router = express.Router();

// Configure storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // Prepend the timestamp to avoid filename conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Event creation route
router.post(
  "/create",
  upload.fields([
    { name: "artist_img" },
    { name: "banner_img" },
    { name: "poster_img" },
  ]),
  async (req, res) => {
    const eventFields = req.body;
    if (req.files) {
      if (req.files.artist_img)
        eventFields.artist_img = req.files.artist_img[0].path;
      if (req.files.banner_img)
        eventFields.banner_img = req.files.banner_img[0].path;
      if (req.files.poster_img)
        eventFields.poster_img = req.files.poster_img[0].path;
    }
    try {
      const newEvent = new Event(eventFields);
      await newEvent.save();
      res
        .status(201)
        .json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create the event", error: error.message });
    }
  }
);

module.exports = router;
