const axios = require("axios");
const User = require("../models/User");
const mongoose = require("mongoose");
const ChatMessage = require("../models/MedicalChatMessage");

function cleanUserId(userId) {
  // Remove any non-alphanumeric characters
  return userId.replace(/[^a-fA-F0-9]/g, "");
}

// async function medicalChat(req, res) {
//   try {
//     const { question ,userId} = req.body; // Assuming the question is sent in the request body
//     // const { userId } = req.user; // Assuming you have the user's ID in req.user

//     // Forward the question to the Flask application
//     const flaskUrl = "http://127.0.0.1:4000"; // Change the port if necessary
//     const response = await axios.post(`${flaskUrl}/medical`, { question });

//     // Create a chat message document
//     const chatMessage = new ChatMessage({
//       user: new mongoose.Types.ObjectId(userId), // Associate the chat message with the user's ID
//       question: question,
//       response: response.data.response,
//       timestamp: new Date(),
//     });

//     // Insert the chat message document into MongoDB
//     chatMessage.save();

//     // Send the Flask application's response back to the client
//     res.json({ response: response.data.response });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
async function medicalChat(req, res) {
  try {
    const { question, userId } = req.body;
    const flaskUrl = "http://127.0.0.1:4000"; // Change the URL to your Flask application
    // Make an HTTP request to your Flask application
    const response = await axios.post(`${flaskUrl}/medical`, { question });
    // Handle the response from the Flask application
    if (response.status === 200) {
      const responseData = response.data; // Extract data from the response
      // Find the chat message document for the user
      let chatMessage = await ChatMessage.findOne({ user: userId });
      const now = new Date();
      const conversationInterval = 60 * 60 * 1000; // 15 minutes in milliseconds
      if (chatMessage) {
        // Check if the last conversation timestamp is within the interval
        if (
          chatMessage.conversationArrays &&
          chatMessage.conversationArrays.length > 0 &&
          now - chatMessage.conversationArrays[chatMessage.conversationArrays.length - 1][0].timestamp <= conversationInterval
        ) {
          // If within the interval, add to the current conversation
          chatMessage.conversationArrays[chatMessage.conversationArrays.length - 1].push({ role: "user", text: question, timestamp: now });
          chatMessage.conversationArrays[chatMessage.conversationArrays.length - 1].push({ role: "bot", text: response.data.response, timestamp: now });
        } else {
          // If outside the interval, create a new conversation array
          chatMessage.conversationArrays = chatMessage.conversationArrays || []; // Initialize the conversationArrays if not already defined
          chatMessage.conversationArrays.push([]); // Create a new conversation array
          chatMessage.conversationIntervals = chatMessage.conversationIntervals || []; // Initialize the conversationIntervals if not already defined
          chatMessage.conversationIntervals.push(chatMessage.conversationArrays.length); // Record the interval number
          chatMessage.conversationArrays[chatMessage.conversationArrays.length - 1].push({ role: "user", text: question, timestamp: now });
          chatMessage.conversationArrays[chatMessage.conversationArrays.length - 1].push({ role: "bot", text: response.data.response, timestamp: now });
          // Increment the conversation count
          chatMessage.conversationCount += 1;
        }
      } else {
        // If no chat message document exists, create a new one with a new conversation array
        const conversation = [
          {
            role: "user",
            text: question,
            timestamp: now,
          },
          { role: "bot", text: response.data.response, timestamp: now },
        ];
        chatMessage = new ChatMessage({
          user: userId,
          conversationArrays: [conversation], // Initialize with the first conversation array
          conversationIntervals: [1], // Initialize with the first interval
          conversationCount: 1, // Initialize the conversation count
        });
      }
      // Save the chat message document to update the conversation history
      await chatMessage.save();
      // Send the Flask application's response back to the client
      res.json({
        response: responseData,
        conversationArrays: chatMessage.conversationArrays,
        conversationCount: chatMessage.conversationCount,
        conversationIntervals: chatMessage.conversationIntervals,
      });
    } else {
      res.status(500).json({ error: "Failed to fetch medical response" });
    }
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
