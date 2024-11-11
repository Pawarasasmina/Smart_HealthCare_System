import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate
import axios from "axios";
import { Typography, Button, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar"; // Adjust the import path as necessary

const ReportDetails = () => {
    const { id } = useParams(); // Get the report ID from URL
    const navigate = useNavigate(); // Use useNavigate for navigation
    const [report, setReport] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/medicalReport/${id}`);
                setReport(response.data);
            } catch (error) {
                console.error("Error fetching report:", error);
            }
        };

        fetchReport();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/medicalReport/${id}`);
            alert("Report deleted successfully");
            navigate("/added-reports"); // Redirect back to the reports list
        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report");
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`http://localhost:3000/api/medicalReport/${id}`, report);
            alert("Report updated successfully");
            navigate("/addedReports"); // Redirect back to the reports list
        } catch (error) {
            console.error("Error updating report:", error);
            alert("Failed to update report");
        }
    };

    if (!report) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 w-full p-4"> {/* Adjust margin to match sidebar width */}
                <Typography variant="h4" component="h1" gutterBottom className="text-blue-700">
                    Report Details
                </Typography>
                <TextField
                    label="Sugar Level (mg/dL)"
                    value={report.sugarLevel}
                    onChange={(e) => setReport({ ...report, sugarLevel: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Blood Pressure (mmHg)"
                    value={report.bloodPressure}
                    onChange={(e) => setReport({ ...report, bloodPressure: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Heart Rate (bpm)"
                    value={report.heartRate}
                    onChange={(e) => setReport({ ...report, heartRate: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Cholesterol Level (mg/dL)"
                    value={report.cholesterolLevel}
                    onChange={(e) => setReport({ ...report, cholesterolLevel: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Weight (kg)"
                    value={report.weight}
                    onChange={(e) => setReport({ ...report, weight: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Height (cm)"
                    value={report.height}
                    onChange={(e) => setReport({ ...report, height: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Symptoms"
                    value={report.symptoms}
                    onChange={(e) => setReport({ ...report, symptoms: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                />
                <TextField
                    label="Diagnosis"
                    value={report.diagnosis}
                    onChange={(e) => setReport({ ...report, diagnosis: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                />
                <TextField
                    label="Treatment"
                    value={report.treatment}
                    onChange={(e) => setReport({ ...report, treatment: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                />
                <TextField
                    label="Prescription"
                    value={report.prescription}
                    onChange={(e) => setReport({ ...report, prescription: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                />
                <TextField
                    label="Notes"
                    value={report.notes}
                    onChange={(e) => setReport({ ...report, notes: e.target.value })}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                />

                <div className="flex justify-between mt-4">
                    <Button variant="contained" color="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleDelete}>
                        Delete Report
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;
