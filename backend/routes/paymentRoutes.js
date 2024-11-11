// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");

// Post payment information
router.post("/payment", async (req, res) => {
  const { userEmail, appointmentIds, paymentMethod, amount, tax, totalAmount } =
    req.body;

  try {
    // Create new payment record
    const payment = new Payment({
      userEmail,
      appointmentIds,
      paymentMethod,
      amount,
      tax,
      totalAmount,
    });

    const savedPayment = await payment.save();

    // Extract appointment IDs for deletion
    const appointmentIdsToDelete = appointmentIds.map(
      (appointment) => appointment._id
    ); // Assuming _id is the property to use for deletion

    // After successful payment, delete selected appointments
    await Appointment.deleteMany({ _id: { $in: appointmentIdsToDelete } });

    return res.status(201).json({
      message: "Payment successful and appointments deleted",
      payment: savedPayment,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ message: "Payment failed" });
  }
});

// Get payment information by user email
router.get("/payments/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    const payments = await Payment.find({ userEmail });

    if (payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No payments found for this email." });
    }

    return res
      .status(200)
      .json({ message: "Payments fetched successfully", payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ message: "Error fetching payments" });
  }
});

module.exports = router;
