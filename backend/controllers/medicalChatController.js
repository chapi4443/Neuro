const axios = require("axios");
const User = require("../models/User");
const mongoose = require("mongoose");
const ChatMessage = require("../models/MedicalChatMessage");

function cleanUserId(userId) {
  // Remove any non-alphanumeric characters
  return userId.replace(/[^a-fA-F0-9]/g, "");
}




async function medicalChat(req, res) {
  try {
    const { question ,userId} = req.body; // Assuming the question is sent in the request body
    // const { userId } = req.user; // Assuming you have the user's ID in req.user

    // Forward the question to the Flask application
    const flaskUrl = "http://127.0.0.1:4000"; // Change the port if necessary
    const response = await axios.post(`${flaskUrl}/medical`, { question });

    // Create a chat message document
    const chatMessage = new ChatMessage({
      user: new mongoose.Types.ObjectId(userId), // Associate the chat message with the user's ID
      question: question,
      response: response.data.response,
      timestamp: new Date(),
    });

    // Insert the chat message document into MongoDB
    chatMessage.save();

    // Send the Flask application's response back to the client
    res.json({ response: response.data.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getMedicalChatByUserId(req, res) {
  try {
    const userId = cleanUserId(req.params.userId); // Clean the user ID

    // Fetch chat messages for the specified user from the database
    const userChatMessages = await ChatMessage.find({ user: userId });

    if (!userChatMessages || userChatMessages.length === 0) {
      return res
        .status(404)
        .json({ error: "No chat messages found for the specified user" });
    }

    res.json({ chatMessages: userChatMessages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



module.exports = {

  medicalChat,
  
  getMedicalChatByUserId,
};