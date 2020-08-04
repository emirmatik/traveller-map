const mongoose = require("mongoose");

const logEntrySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    comments: { type: String, required: true },
    description: String,
    rating: String,
    image: String,
    long: { type: Number, min: -90, max: 90 },
    lat: { type: Number, min: -180, max: 180 },
    visited: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const logEntry = new mongoose.model("logEntry", logEntrySchema);

module.exports = logEntry;
