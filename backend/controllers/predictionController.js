// controllers/predictionController.js
const axios = require("axios");
const User = require("../models/User");
const StrokePrediction = require("../models/StrokePrediction");

async function predictStrokeRisk(req, res) {
  try {
    const { userId } = req.user; // Assuming you have the user's ID available in req.user

    // Forward the request to the Flask application
    const flaskUrl = "http://127.0.0.1:4000"; // Change the port if necessary
    const response = await axios.post(
      `${flaskUrl}/predict_stroke_risk`,
      req.body
    );

    // Store the prediction data in MongoDB
    const predictionData = {
      user: userId, // Link the prediction to the user
      prediction: response.data["Logistic Regression Probability"],
      data: req.body.data[0], // Save the input data used for the prediction
    };

    const prediction = new StrokePrediction(predictionData);
    await prediction.save();

    // Send the Flask application's response back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



// controllers/predictionController.js

async function getAllPredictions(req, res) {
  try {
    // Fetch all predictions from the database
    const predictions = await StrokePrediction.find();

    // Send the predictions as a JSON response
    res.json({ predictions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMedicalResponse(req, res) {
  try {
    const { question } = req.body; // Assuming the question is sent in the request body

    // Forward the question to the Flask application
    const flaskUrl = "http://127.0.0.1:4000"; // Change the port if necessary
    const response = await axios.post(`${flaskUrl}/medical`, { question });

    // Send the Flask application's response back to the client
    res.json({ response: response.data.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to call the '/get_stroke_recommendations' route in your Flask application
async function getStrokeRecommendationsFromFlask(data) {
  try {
    const flaskUrl = "http://127.0.0.1:4000"; // Change the URL and port if necessary

    // Make a POST request to the Flask route
    const response = await axios.post(`${flaskUrl}/get_stroke_recommendations`, data);

    // Return the response data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to call Flask route.");
  }
}


module.exports = {
  predictStrokeRisk,
  getAllPredictions,
  getMedicalResponse,
  getStrokeRecommendationsFromFlask,
};