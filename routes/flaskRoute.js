const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/predict_stroke_risk", async (req, res) => {
  try {
    // Replace with the actual URL where your Flask application is running on port 4000
    const flaskUrl = "http://127.0.0.1:4000"; // Change the port to 4000

    // Forward the request to the Flask application
    const response = await axios.post(
      `${flaskUrl}/predict_stroke_risk`,
      req.body
    );

    // Send the Flask application's response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
