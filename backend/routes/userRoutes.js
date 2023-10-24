const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  updateUser,
  updateUserPassword,
  editProfilePicture,
  deleteProfilePicture,
  createProfilePicture,
} = require("../controllers/userController");

// Route for updating user information
router.patch("/updateUser", authenticateUser, updateUser);

// Route for updating user password
router.patch("/updateUserPassword", authenticateUser, updateUserPassword);

// Route for editing profile picture
router.patch("/editProfilePicture", authenticateUser, editProfilePicture);

// Route for deleting profile picture
router.delete("/deleteProfilePicture", authenticateUser, deleteProfilePicture);

// Route for creating a profile picture
router.post("/createProfilePicture", authenticateUser, createProfilePicture);

module.exports = router;
