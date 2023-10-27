const mongoose = require("mongoose");

const StrokePredictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (if you have one)
      required: true,
    },
    advice: {
      type: String, // Store the advice text
    },
    interpretation: {
      type: String, // Store the interpretation text
    },
    prediction: {
      type: Number,
      required: true, // Store the Logistic Regression Probability
    },
    data: {
      type: Object,
      required: true, // Store the input data used for the prediction
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields to your document
  }
);

module.exports = mongoose.model("StrokePrediction", StrokePredictionSchema);
