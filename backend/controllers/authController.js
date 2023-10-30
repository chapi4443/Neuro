const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { attachCookiesToResponse, createTokenUser } = require("../utils");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { formData } = req.body;
  const {
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    phone_number,
    address,
    city,
    age,
    gender,
    country,
  } = formData;
  console.log(formData);
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
  // const { data } = req.body;
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    token = res.getHeaders()["set-cookie"];
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token: token });
  } catch (error) {
    // Handle other errors here, if needed
    return res.status(500).json({ error: "An error occurred" });
  }
};
const forgotPassword = async (req, res) => {
  var email = req.body.email;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User Not found");
    return res.status(404).json({ error: "User Not found" });
  }

  console.log("forget password");
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "enterct35i@gmail.com",
      pass: "eivj sueg qdqg zmsl",
    },
  });
  const forgotPasswordToken = jwt.sign(
    { userEmail: email },
    "Wintu-Yoni@2022",
    {
      expiresIn: "4h",
    }
  );

  // var forgotPasswordLink =
  //   "http://localhost:3000/login/?token=" + forgotPasswordToken;
  console.log("hello", email);
  if (email) {
    console.log(email);

    var forgotPasswordLink = `http://localhost:3000/reset-password/?token=${forgotPasswordToken}`;
    var mailOptions = {
      from: "NeurogeAi@gmail.com",
      to: email,
      subject: "Reset Password",
      html:
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
        '<html xmlns="http://www.w3.org/1999/xhtml"><head>' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
        "<title>Forgot Password</title>" +
        "<style> body {background-color: #FFFFFF; padding: 0; margin: 0;}</style></head>" +
        '<body style="background-color: #FFFFFF; padding: 0; margin: 0;">' +
        '<table style="max-width: 650px; background-color: #2F6296; color: #ffffff;" id="bodyTable">' +
        '<tr><td align="center" valign="top">' +
        '<table id="emailContainer" style="font-family: Arial; color: #FFFFFF; text-align: center;">' +
        '<tr><td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #CCCCCC; padding-  bottom: 10px;">' +
        "</td></tr><tr>" +
        '<td align="left" valign="top" colspan="2" style="border-bottom: 1px solid #FFFFFF; padding: 20px 0 10px 0;">' +
        '<span style="font-size: 24px; font-weight: normal;color: #FFFFFF">FORGOT PASSWORD</span></td></tr><tr>' +
        '<td align="left" valign="top" colspan="2" style="padding-top: 10px;">' +
        '<span style="font-size: 18px; line-height: 1.5; color: #333333;">' +
        " We have sent you this email in response to your request to reset your password on <a href='http://localhost:3000'>NeuroGen AI System</a><br/><br/>" +
        'To reset your password for, please follow the link below: <button style="font:inherit; cursor: pointer; border: #272727 2px solid; background-color: transparent; border-radius: 5px;"><a href="' +
        forgotPasswordLink +
        '"style="color: #272727; text-decoration: none;">Reset Password</a></button><br/><br/>' +
        "We recommend that you keep your password secure and not share it with anyone.If you didn't request to this message, simply ignore this message.<br/><br/>" +
        "NeuroGenAI Management System </span> </td> </tr> </table> </td> </tr> </table> </body></html>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({
          ErrorMessage: error,
        });
      } else {
        console.log("succcesssss");
        return res.json({
          SuccessMessage: "email successfully sent!",
        });
      }
    });
  } else {
    return res.json({
      ErrorMessage: "Email can't be none!",
    });
  }
};
const ResetPassword = async (req, res) => {
  console.log(req.body);
  try {
    const { newPassword, email } = req.body;
    console.log(newPassword, email);
    const encreptedPassword = await bcrypt.hash(newPassword, 10);
    console.log(encreptedPassword);
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // Use the updateOne method with async/await
    const result = await User.updateOne(
      { email: email },
      { $set: { password: encreptedPassword } }
    );
    console.log(result);

    // Check the result and handle it accordingly
    if (result.modifiedCount === 1) {
      return res.json({ message: "Password reset successful" });
    } else {
      return res
        .status(404)
        .json({ message: "User not found or password not modified" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
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
  ResetPassword,
  forgotPassword,
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
