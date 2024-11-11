// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  appointmentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["credit", "debit", "paypal", "insurance"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Success",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
