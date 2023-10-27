// controllers/predictionController.js
const axios = require("axios");
const User = require("../models/User");
const StrokePrediction = require("../models/StrokePrediction");
const mongoose = require("mongoose");
const ChatMessage = require("../models/MedicalChatMessage");

function cleanUserId(userId) {
  // Remove any non-alphanumeric characters
  return userId.replace(/[^a-fA-F0-9]/g, "");
}

// async function predictStrokeRisk(req, res) {
//   try {
//     console.log("userId");
//     const { userId } = req.body; // Assuming you have the user's ID available in req.user
//     // Forward the request to the Flask application
//     const flaskUrl = "http://127.0.0.1:4000"; // Change the port if necessary
//     const response = await axios.post(
//       `${flaskUrl}/predict_stroke_risk`,
//       req.body
//     );

//     // Store the prediction data in MongoDB
//     const predictionData = {
//       user: new mongoose.Types.ObjectId(userId), // Use 'new' to create a new ObjectId
//       prediction: response.data["Logistic Regression Probability"],
//       data: req.body.data[0], // Save the input data used for the prediction
//     };

//     const prediction = new StrokePrediction(predictionData);
//     await prediction.save();

//     // Send the Flask application's response back to the client
//     res.json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function predictStrokeRisk(req, res) { 
  try { 
    console.log("userId"); 
    const { userId } = req.body; // Assuming you have the user's ID available in req.user 
    // Forward the request to the Flask application 
    const flaskUrl = "http://127.0.0.1:4000"; // Change the port if necessary 
    const response = await axios.post( 
      `${flaskUrl}/predict_stroke_risk`, 
      req.body 
    ); 
 
    // Store the prediction data in MongoDB 
    const predictionData = { 
      user: new mongoose.Types.ObjectId(userId), // Use 'new' to create a new ObjectId 
      advice: response.data["Advice"], 
      interpretation: response.data["Interpretation"], 
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
    // Check if the user is authenticated and obtain the user's ID
    const userId = req.user.id; // Assuming you have a user object with ID after authentication

    // Fetch predictions for the logged-in user from the database
    const userPredictions = await StrokePrediction.find({ userId });

    // Send the user's predictions as a JSON response
    res.json({ predictions: userPredictions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPredictionsByUserId(req, res) {
  try {
    const userId = cleanUserId(req.params.userId); // Clean the user ID

    // Fetch predictions for the specified user from the database
    const userPredictions = await StrokePrediction.find({ user: userId });

    if (!userPredictions || userPredictions.length === 0) {
      return res
        .status(404)
        .json({ error: "No predictions found for the specified user" });
    }

    res.json({ predictions: userPredictions });
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

// Function to get the latest prediction and display it as a notification
async function displayLatestNotification(req, res) {
  try {
    // Check if the user is authenticated and obtain the user's ID
    const userId = req.user.id; // Assuming you have a user object with ID after authentication

    // Fetch the latest prediction for the logged-in user from the database
    const latestPrediction = await StrokePrediction.findOne({ user: userId })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order to get the latest prediction
      .select("advice interpretation createdAt"); // Select the fields you want to display

    if (!latestPrediction) {
      return res.status(404).json({ error: "No predictions found for the specified user" });
    }

    // Construct the notification object
    const notification = {
      advice: latestPrediction.advice,
      interpretation: latestPrediction.interpretation,
      createdAt: latestPrediction.createdAt,
    };

    res.json({ notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




module.exports = {
  predictStrokeRisk,
  getAllPredictions,
  getStrokeRecommendationsFromFlask,
  getPredictionsByUserId,
  displayLatestNotification
  
};