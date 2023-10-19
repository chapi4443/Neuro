const express = require("express");
const router = express.Router();
const medicalChatController = require("../controllers/medicalChatController"); // Import your controller

// Define routes and link them to controller functions
router.post("/medical-chat", medicalChatController.medicalChat);
router.get(
  "/medical-chat/:userId",
  medicalChatController.getMedicalChatByUserId
);

module.exports = router;
