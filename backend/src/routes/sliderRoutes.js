// routes/slider.js
const express = require("express");
const multer = require("multer");
const SliderItem = require("../models/SliderModel");
const router = express.Router();

// Set up Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Insert a slider item
router.post("/create", upload.single("image"), async (req, res) => {
  const { title, description, link } = req.body;
  const imageUrl = req.file.path; // Using the file path as the image URL

  try {
    const sliderItem = new SliderItem({ title, description, imageUrl, link });
    await sliderItem.save();
    res.status(201).json(sliderItem);
  } catch (error) {
    res.status(400).json({ message: "Error creating slider item", error });
  }
});
//get all slider items
router.get("/allslider", async (req, res) => {
  try {
    const sliderItems = await SliderItem.find();
    res.status(200).json(sliderItems);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
