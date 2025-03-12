const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/weather-by-city", (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.json({ status: "error", message: "City is required" });
  }

  res.json({ status: "success", message: `Il fait actuellement x° à ${city}` });
});

module.exports = router;
