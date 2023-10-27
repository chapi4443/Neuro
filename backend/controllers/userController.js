const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CustomError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

// Multer storage configuration for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Define the destination folder for profile pictures
  },
  filename: (req, file, cb) => {
    cb(null, `profile_${req.user.userId}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5 MB
  },
});

// Create a profile picture
const addProfilePicture = upload.single("profilePicture"); // 'profilePicture' is the field name in your form

const createProfilePicture = async (req, res) => {
  try {
    addProfilePicture(req, res, async (err) => {
      if (err) {
        throw new CustomError.BadRequestError(
          "Error uploading profile picture"
        );
      }
      const user = await User.findOne({ _id: req.user.userId });

      // You can save the file path or other relevant information in the user profile
      user.profilePicture = req.file.path; // Assumes the field in your User model is 'profilePicture'

      await user.save();

      res
        .status(StatusCodes.OK)
        .json({ msg: "Profile picture uploaded successfully" });
    });
  } catch (error) {
    // Handle errors appropriately
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const editProfilePicture = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const profilePicturePath = user.profilePicture;

    if (profilePicturePath) {
      // Delete the old profile picture using fs.unlink or other methods
      fs.unlink(profilePicturePath, (err) => {
        if (err) {
          throw new CustomError.InternalServerError(
            "Error deleting old profile picture"
          );
        }
      });
    }

    // Now, update the profile picture with the new one
    addProfilePicture(req, res, async (err) => {
      if (err) {
        throw new CustomError.BadRequestError(
          "Error uploading new profile picture"
        );
      }

      // Update the user's profilePicture field with the new path
      user.profilePicture = req.file.path; // Assumes the field in your User model is 'profilePicture'

      await user.save();

      res
        .status(StatusCodes.OK)
        .json({ msg: "Profile picture updated successfully" });
    });
  } catch (error) {
    // Handle errors appropriately
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteProfilePicture = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    const profilePicturePath = user.profilePicture;

    if (profilePicturePath) {
      // Delete the profile picture from the server using fs.unlink or other methods
      fs.unlink(profilePicturePath, (err) => {
        if (err) {
          throw new CustomError.InternalServerError(
            "Error deleting profile picture"
          );
        }

        // Clear the profilePicture field in the User model
        user.profilePicture = null;

        // Save the user
        user.save((err) => {
          if (err) {
            throw new CustomError.InternalServerError(
              "Error saving user after deleting profile picture"
            );
          }
          res
            .status(StatusCodes.OK)
            .json({ msg: "Profile picture deleted successfully" });
        });
      });
    } else {
      throw new CustomError.BadRequestError("No profile picture to delete");
    }
  } catch (error) {
    // Handle errors appropriately
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
  }
  // checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

// Update user information
const updateUser = async (req, res) => {
  const {
    first_name,
    last_name,
    date_of_birth,
    phone_number,
    address,
    city,
    age,
    gender,
    country,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !date_of_birth ||
    !phone_number ||
    !address ||
    !city ||
    !age ||
    !gender ||
    !country
  ) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  try {
    const { userId } = req.body;

    // Find the user by their ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }

    // Update user's information

    user.first_name = first_name;
    user.last_name = last_name;
    user.date_of_birth = date_of_birth;
    user.phone_number = phone_number;
    user.address = address;
    user.city = city;
    user.age = age;
    user.gender = gender;
    user.country = country;

    // Save the updated user
    await user.save();

    // Create a new JWT token with updated information
    const tokenUser = createTokenUser(user);

    // Attach the updated JWT token to the response cookies
    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
  } catch (error) {
    // Handle validation errors or other errors and send an appropriate response
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(StatusCodes.BAD_REQUEST).json({ error: errors });
    } else {
      // Handle other types of errors
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
};

const updateUserPasswordandemail = async (req, res) => {
  const { oldPassword, newPassword, newEmail, userId } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError(
      "Please provide both oldPassword and newPassword."
    );
  }

  const user = await User.findOne({ _id: userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  // Update the password
  user.password = newPassword;

  // Check if a new email is provided and update it if necessary
  if (newEmail) {
    // You should also validate the new email here (e.g., format validation)
    user.email = newEmail;
  }

  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success! Password and email updated." });
};

module.exports = {
  updateUser,
  updateUserPasswordandemail,
  editProfilePicture,
  deleteProfilePicture,
  createProfilePicture,
  getSingleUser,
};
