const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Get appointments for a specific user by email (GET)
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const appointments = await Appointment.find({ userEmail: email });
    if (!appointments || appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this user" });
    }
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching appointments", details: error.message });
  }
});

// Create a new appointment (POST)
router.post("/", async (req, res) => {
  const {
    appointmentNo,
    doctorName,
    specialization,
    appointmentTime,
    charge,
    date,
    scheduledTime,
    userEmail,
  } = req.body;

  try {
    const newAppointment = new Appointment({
      appointmentNo,
      doctorName,
      specialization,
      appointmentTime,
      charge,
      date,
      scheduledTime,
      userEmail,
    });

    await newAppointment.save();
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating appointment", details: error.message });
  }
});

// Bulk insert appointments (POST)
router.post("/bulk", async (req, res) => {
  const appointmentsData = req.body; // Expecting an array of appointment objects

  if (!Array.isArray(appointmentsData) || appointmentsData.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input, expected an array of appointments." });
  }

  try {
    // Create multiple appointments
    const newAppointments = await Appointment.insertMany(appointmentsData);

    res.status(201).json({
      message: "Appointments created successfully",
      appointments: newAppointments,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error creating appointments", details: error.message });
  }
});

// Delete an appointment by ID (DELETE)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting appointment", details: error.message });
  }
});

module.exports = router;
