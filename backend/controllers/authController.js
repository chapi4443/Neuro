const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials-password");
  }

  // Use the secret key and token expiration from environment variables
  const secretKey = process.env.JWT_SECRET;
  const tokenExpiration = process.env.JWT_LIFETIME;

  if (!secretKey) {
    throw new CustomError.InternalServerError(
      "JWT secret key is not configured."
    );
  }

  if (!tokenExpiration) {
    throw new CustomError.InternalServerError(
      "Token expiration is not configured."
    );
  }

  // Define the payload for the JWT
  const payload = {
    userId: user._id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
  };

  // Generate a JSON Web Token (JWT) with the configured expiration time
  const token = jwt.sign(payload, secretKey, { expiresIn: tokenExpiration });

  res.status(StatusCodes.OK).json({
    user: {
      _id: user._id,
      email: user.email,
      token: token,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  register,
  login,
  logout,
};





// const register = async (req, res) => {
//   const {
//     email,
//     password,
//     first_name,
//     last_name,
//     date_of_birth,
//     phone_number,
//     address,
//     city,
//     age,
//     gender,
//     country,
//   } = req.body;

//   try {
//     // Check if email already exists
//     const emailAlreadyExists = await User.findOne({ email });
//     if (emailAlreadyExists) {
//       throw new CustomError.BadRequestError("Email already exists");
//     }

//     // Create a new user with the provided fields
//     const newUser = await User.create({
//       email,
//       password,
//       first_name,
//       last_name,
//       date_of_birth,
//       phone_number,
//       address,
//       city,
//       age,
//       gender,
//       country,
//     });

//     // Set the default role to "user"
//     const role = "user";

//     // Additional validation can be added here if necessary

//     // Create a JWT token with the user's personal information
//     const userWithToken = createTokenUser({
//       userId: newUser._id, // Use the user's ID or any unique identifier
//       role,
//       name: `${first_name} ${last_name}`, // Combine first and last names
//       age,
//       gender,
//       country,
//       // Add any other personal information you want to include in the token
//     });

//     // Attach the JWT token to the response cookies
//     attachCookiesToResponse({ res, user: userWithToken });

//     res.status(StatusCodes.CREATED).json({ user: userWithToken });
//   } catch (error) {
//     // Handle validation errors or other errors and send an appropriate response
//     if (error.name === "ValidationError") {
//       const errors = Object.values(error.errors).map((err) => err.message);
//       res.status(StatusCodes.BAD_REQUEST).json({ error: errors });
//     } else {
//       // Handle other types of errors
//       res
//         .status(StatusCodes.INTERNAL_SERVER_ERROR)
//         .json({ error: error.message });
//     }
//   }
// };