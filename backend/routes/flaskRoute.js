const express = require("express");
const router = express.Router();
const predictionController = require("../controllers/predictionController");
const { authenticateUser } = require("../middleware/authentication");

// Define the route for predicting stroke risk
router.post(
  "/predict_stroke_risk",
  // authenticateUser,
  predictionController.predictStrokeRisk
);
router.get(
  "/predictions",
  authenticateUser,
  predictionController.getAllPredictions
);

// Add the route for getting predictions by user ID
router.get(
  "/predictions/:userId", // Define the route with a dynamic parameter
  // authenticateUser,
  predictionController.getPredictionsByUserId
);





router.post("/getStrokeRecommendations", async (req, res) => {
  try {
    const data = req.body;
    const response =
      await predictionController.getStrokeRecommendationsFromFlask(data);
    res.json(response);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
