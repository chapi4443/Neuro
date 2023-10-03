const logisticRegressionModel = require("../models/logisticRegressionModel");

async function predictStrokeRisk(req, res) {
  try {
    const inputData = req.body; // Assuming the request contains the input data as JSON

    if (!inputData) {
      return res.status(400).json({ error: "Input data is missing." });
    }

    const probability = await logisticRegressionModel.predict(inputData);

    res.json({ probability });
  } catch (error) {
    console.error("Prediction error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { predictStrokeRisk };
