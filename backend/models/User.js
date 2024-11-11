const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  userLevel: {
    type: Number,
    default: 0, // 0: Customer, 1: Seller, 2: Admin
  },
  QrCode: {
    type: String,
    default: null, // Store QR code data here
  },
  profilePicture: {
    type: String,
    default: null, // Store profile picture URL or path
  },
  weight: {
    type: Number, // Assuming weight is stored as a number
    default: null, // You can set a default value if needed
  },
  height: {
    type: Number, // Assuming height is stored as a number (e.g., in centimeters)
    default: null, // You can set a default value if needed
  },
  dateOfBirth: {
    type: Date, // Assuming date of birth is stored as a date
    default: null, // You can set a default value if needed
  },
  gender: {
    type: String, // Assuming gender is stored as a string
    default: null, // You can set a default value if needed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
