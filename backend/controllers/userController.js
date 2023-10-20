const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils');





// update user with user.save()
const updateUser = async (req, res) => {
  const {
    email,
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
    !email ||
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
    const userId = req.user.userId;

    // Find the user by their ID
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new CustomError.NotFoundError("User not found");
    }

    // Update user's information
    user.email = email;
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

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' });
};

module.exports = {
  
  updateUser,
  updateUserPassword,
};

// update user with findOneAndUpdate
// const updateUser = async (req, res) => {
//   const { email, name } = req.body;
//   if (!email || !name) {
//     throw new CustomError.BadRequestError('Please provide all values');
//   }
//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );
//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });
//   res.status(StatusCodes.OK).json({ user: tokenUser });
// };
