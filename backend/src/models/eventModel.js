const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  number_of_seats: { type: Number, required: true },
  price: { type: Number, required: true },
  event_date: { type: Date, required: true },
  event_time: { type: String, required: true },
  artist_name: { type: String, required: true },
  artist_description: { type: String, required: true },
  artist_img: { type: String },
  banner_img: { type: String },
  poster_img: { type: String },
  google_map_url: { type: String, required: true },
  city: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  vendor_email: { type: String, required: true },
  status: { type: String, required: true, default: "inactive" },
});

module.exports = mongoose.model("Event", eventSchema);
