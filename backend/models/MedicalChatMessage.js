const mongoose = require("mongoose");

// Define the schema for chat messages
const chatMessageSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Assuming the user is identified by a string (userId)
  conversationArrays: [
    [
      {
        role: { type: String, enum: ['user', 'bot'], required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, required: true },
      },
    ],
  ],
  conversationIntervals: [Number],
  conversationCount: { type: Number, default: 0 },
});

// Create a Mongoose model for chat messages
const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

// Export the model
module.exports = ChatMessage;
