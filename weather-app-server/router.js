const express = require("express");

const router = express.Router();

router.get("/weather-by-city", (req, res) => {
  console.log("Route OK ✅");
});

module.exports = router;
