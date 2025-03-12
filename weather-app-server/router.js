const express = require("express");

const router = express.Router();

router.post("/weather-by-city", (req, res) => {
  const { city } = req.body;
  res.json({ message: `Bien reçu ${city}` });
});

module.exports = router;
