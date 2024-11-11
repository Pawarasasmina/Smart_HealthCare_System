const express = require("express");
const router = express.Router();
const Doctors = require("../models/doctor");

router.get("/test", (req, res) => res.send("Customer routes waiting"));

// Function to generate the next doctor ID
const generateDoctorId = async () => {
    const lastDoctor = await Doctors.findOne({}, {}, { sort: { doctorId: -1 } });
    if (lastDoctor) {
        const lastId = lastDoctor.doctorId; // Get the last doctorId
        const lastNumber = parseInt(lastId.substring(1), 10); // Extract the number
        const newId = `D${String(lastNumber + 1).padStart(3, '0')}`; // Increment and format
        return newId;
    }
    return "D001"; // Start with D001 if no doctors exist
};

// Create a doctor
router.post("/", async (req, res) => {
    try {
        const newDoctorId = await generateDoctorId(); // Generate doctorId
        const doctor = await Doctors.create({ ...req.body, doctorId: newDoctorId });
        res.json({ msg: "Doctor added successfully", doctor });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Failed to add doctor" });
    }
});



// Get all feedback
router.get("/", async (req, res) => {
    try {
        const doctor = await Doctors.find();
        res.json(doctor);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "No reviews found" });
    }
});

// Get a review by ID
router.get("/:id", async (req, res) => {
    try {
        const doctor = await Doctors.findById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(400).json({ msg: "doctor not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Cannot find this doctor" });
    }
});

// Delete a doctor by ID
router.delete("/:id", async (req, res) => {
    try {
        const doctor = await Doctors.findByIdAndDelete(req.params.id);
        if (doctor) {
            res.json({ msg: "Doctor deleted successfully", doctor });
        } else {
            res.status(400).json({ msg: "Doctor not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Failed to delete doctor" });
    }
});

// Update a doctor by ID
router.put("/:id", async (req, res) => {
    try {
        const doctor = await Doctors.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (doctor) {
            res.json({ msg: "Doctor updated successfully", doctor });
        } else {
            res.status(400).json({ msg: "Doctor not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Failed to update doctor" });
    }
});


// In routes/doctors.js
router.delete('/', async (req, res) => {
    try {
        await Doctors.deleteMany({}); // Deletes all doctors
        res.status(200).json({ msg: "All doctors deleted successfully" });
    } catch (error) {
        console.error("Error deleting doctors:", error);
        res.status(500).json({ msg: "Failed to delete doctors" });
    }
});



module.exports = router;