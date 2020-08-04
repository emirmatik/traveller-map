const mongoose = require("mongoose");
const router = require("express").Router();
const logEntry = require("../models/entry");

router.get("/", async (req, res, next) => {
  try {
    const entries = await logEntry.find();

    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newEntry = new logEntry(req.body);
    await newEntry.save();
    res.json(newEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
