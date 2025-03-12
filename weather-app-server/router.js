const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/weather-by-city", async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.json({ status: "error", message: "Une ville est requise" });
  }

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=007dbb8619cf4d718cf101124251203&q=${city}`
    );

    const cityData = {
      cityName: city,
      temperature: response.data.current.temp_c,
      lat: response.data.location.lat,
      lon: response.data.location.lon,
    };

    res.json({ status: "success", cityData });
  } catch (error) {
    res.json({ status: "error", message: `"${city}" ne semble pas exister` });
  }
});

module.exports = router;
