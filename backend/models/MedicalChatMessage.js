const mongoose = require("mongoose");

// Define the schema for chat messages
const chatMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to a User model (if you have one)
  },
  question: String,
  response: String,
  timestamp: Date,
});

// Create a Mongoose model for chat messages
const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

// Export the model
module.exports = ChatMessage;
