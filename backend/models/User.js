const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please provide first name"],
    minlength: 2,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: [true, "Please provide last name"],
    minlength: 2,
    maxlength: 50,
  },
  date_of_birth: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  age: {
    type: Number, // You can use Number to store the age.
    required: [true, "Please provide age"],
    min: 18, // Adjust the minimum age as needed.
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"], // You can adjust the enum values as needed.
    required: [true, "Please provide gender"],
  },
  phone_number: {
    type: String,
    required: [true, "Please provide phone number"],
    validate: {
      validator: validator.isMobilePhone,
      message: "Please provide a valid phone number",
    },
  },
  address: {
    type: String,
    required: [true, "Please provide address"],
    minlength: 5,
    maxlength: 100,
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    minlength: 2,
    maxlength: 50,
  },
  country: {
    type: String,
    required: [true, "Please provide country"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
