const express = require("express");
const multer = require("multer");
const Event = require("../models/eventModel"); // Corrected import path for the Event model
const fs = require("fs");
const path = require("path");
const { dir } = require("console");
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
//all events api

router.get("/eventlist", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding events", error: error.message });
  }
});
// Route to list events by vendor email
router.get("/vendor/:email", async (req, res) => {
  const vendorEmail = req.params.email;
  try {
    const events = await Event.find({ vendor_email: vendorEmail });
    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: "Error listing events by vendor email",
      error: error.message,
    });
  }
});
// Route to list events by category
router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const events = await Event.find({ category: category });
    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res
        .status(404)
        .json({ message: `No events found in category: ${category}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching events by category",
      error: error.message,
    });
  }
});
//delete event api
router.delete("/delete/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    // Define a helper function to delete files synchronously
    const deleteFile = (filePath) => {
      const fullPath = path.join(__dirname, "..", "..", filePath); // Adjust the path based on your directory structure
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
          console.log(`Successfully deleted file: ${fullPath}`);
        } catch (err) {
          console.error(`Failed to delete file: ${fullPath}`, err);
        }
      } else {
        console.log(`File not found, cannot delete: ${fullPath}`);
      }
    };

    // Delete associated images
    ["artist_img", "banner_img", "poster_img"].forEach((imgField) => {
      if (event[imgField]) {
        deleteFile(event[imgField]);
      }
    });

    await Event.findByIdAndDelete(req.params.id);
    res.send("Event and associated images deleted successfully");
  } catch (error) {
    console.error("Failed to delete event:", error);
    res.status(500).send("Server error");
  }
});

//event details api using event id
router.get("/details/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding event details", error: error.message });
  }
});
module.exports = router;
