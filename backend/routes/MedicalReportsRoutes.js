const express = require("express");
const router = express.Router();
const MedicalReport = require("../models/MedicalReport");

// Test route
router.get("/test", (req, res) => res.send("Medical report routes ready"));

// Create a medical report
router.post("/", async (req, res) => {
    try {
        const report = await MedicalReport.create(req.body);
        res.status(201).json({ msg: "Medical report added successfully", report });
    } catch (error) {
        console.error("Error adding medical report:", error);
        res.status(400).json({ msg: "Failed to add medical report" });
    }
});

// Get all medical reports
router.get("/", async (req, res) => {
    try {
        const reports = await MedicalReport.find(); // Removed populate
        res.json(reports);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "No medical reports found" });
    }
});

// Get a medical report by ID
router.get("/:id", async (req, res) => {
    try {
        const report = await MedicalReport.findById(req.params.id); // Removed populate
        if (report) {
            res.json(report);
        } else {
            res.status(404).json({ msg: "Medical report not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Cannot find this medical report" });
    }
});

// Update a medical report by ID
router.put("/:id", async (req, res) => {
    try {
        const report = await MedicalReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (report) {
            res.json({ msg: "Medical report updated successfully", report });
        } else {
            res.status(404).json({ msg: "Medical report not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Failed to update medical report" });
    }
});

// Delete a medical report by ID
router.delete("/:id", async (req, res) => {
    try {
        const report = await MedicalReport.findByIdAndDelete(req.params.id);
        if (report) {
            res.json({ msg: "Medical report deleted successfully", report });
        } else {
            res.status(404).json({ msg: "Medical report not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ msg: "Failed to delete medical report" });
    }
});

// Delete all medical reports
router.delete("/", async (req, res) => {
    try {
        await MedicalReport.deleteMany({}); // Deletes all medical reports
        res.status(200).json({ msg: "All medical reports deleted successfully" });
    } catch (error) {
        console.error("Error deleting medical reports:", error);
        res.status(500).json({ msg: "Failed to delete medical reports" });
    }
});

module.exports = router;
