const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');


const register = async (req, res) => {
  const {
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    phone_number,
    address,
    city,
    age, // Add age to the request body
    gender, // Add gender to the request body
    country, // Add country to the request body
  } = req.body;

  try {
    // Check if email already exists
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError("Email already exists");
    }

    // Create a new user with the provided fields
    const newUser = await User.create({
      email,
      password,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      address,
      city,
      age, // Include age
      gender, // Include gender
      country, // Include country
    });

    // Set the default role to "user"
    const role = "user";

    // Additional validation can be added here if necessary

    const userWithToken = createTokenUser(newUser);
    attachCookiesToResponse({ res, user: userWithToken });

    res.status(StatusCodes.CREATED).json({ user: userWithToken });
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

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
