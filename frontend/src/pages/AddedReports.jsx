import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    CircularProgress,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Box,
    useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AddedReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width: 600px)"); // For detecting mobile devices

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/medicalReport");
                setReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setError("🛑 Failed to fetch reports. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "🆔 Report ID",
                accessor: (row, index) => `R${String(index + 1).padStart(3, '0')}`,
            },
            {
                Header: "🍭 Sugar Level (mg/dL)",
                accessor: "sugarLevel",
            },
            {
                Header: "🩺 Blood Pressure (mmHg)",
                accessor: "bloodPressure",
            },
            {
                Header: "💓 Heart Rate (bpm)",
                accessor: "heartRate",
            },
            {
                Header: "📅 Follow-Up Date",
                accessor: "followUpDate",
                Cell: ({ value }) => new Date(value).toLocaleDateString(),
            },
            {
                Header: "🔧 Actions",
                accessor: (row) => (
                    <Box display="flex" justifyContent="space-between" gap={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(row)}
                            style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                        >
                            ✏️ Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteReport(row)}
                            style={{ borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
                        >
                            🗑️ Delete
                        </Button>
                    </Box>
                ),
            },
        ],
        []
    );

    const handleOpenModal = (report) => {
        setSelectedReport(report);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedReport(null);
    };

    const handleUpdateReport = async () => {
        try {
            await axios.put(`http://localhost:3000/api/medicalReport/${selectedReport._id}`, selectedReport);
            setReports((prevReports) =>
                prevReports.map((report) => (report._id === selectedReport._id ? selectedReport : report))
            );
            handleCloseModal();
        } catch (error) {
            console.error("Error updating report:", error);
            setError("❌ Failed to update report. Please try again.");
        }
    };

    const handleDeleteReport = (report) => {
        setReportToDelete(report);
        setDeleteConfirmationOpen(true);
    };

    const confirmDeleteReport = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/medicalReport/${reportToDelete._id}`);
            setReports(reports.filter((report) => report._id !== reportToDelete._id));
            setReportToDelete(null);
            setDeleteConfirmationOpen(false);
            setError("🗑️ Report deleted successfully!");
        } catch (error) {
            console.error("Error deleting report:", error);
            setError("❌ Failed to delete report. Please try again.");
        }
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: reports });

    return (
        <div className="flex">
            <Sidebar />
            <div className={`ml-64 w-full min-h-screen bg-gray-100 flex flex-col items-center p-4 ${isMobile ? 'ml-0' : 'ml-64'}`}>
                <Typography variant={isMobile ? "h5" : "h4"} component="h1" gutterBottom className="text-blue-700 text-center">
                    🩺 Medical Reports Overview
                </Typography>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <TableContainer component={Paper} className={isMobile ? "max-w-xs" : "max-w-4xl"}>
                        <Table {...getTableProps()}>
                            <TableHead>
                                {headerGroups.map(headerGroup => (
                                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <TableCell {...column.getHeaderProps()} className="font-bold">
                                                {column.render("Header")}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHead>
                            <TableBody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <TableRow {...row.getRowProps()}>
                                            {row.cells.map(cell => (
                                                <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Snackbar 
                    open={Boolean(error)} 
                    autoHideDuration={6000} 
                    onClose={() => setError(null)} 
                    message={error} 
                />

                <Dialog open={open} onClose={handleCloseModal} fullScreen={isMobile}>
                    <DialogTitle>🆕 Update Report</DialogTitle>
                    <DialogContent>
                        {selectedReport && (
                            <>
                                <TextField
                                    label="🍭 Sugar Level (mg/dL)"
                                    type="number"
                                    value={selectedReport.sugarLevel}
                                    onChange={(e) => setSelectedReport({ ...selectedReport, sugarLevel: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            min: 0, 
                                        },
                                    }}
                                />
                                <TextField
                                    label="🩺 Blood Pressure (mmHg)"
                                    type="number"
                                    value={selectedReport.bloodPressure}
                                    onChange={(e) => setSelectedReport({ ...selectedReport, bloodPressure: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            min: 0, 
                                        },
                                    }}
                                />
                                <TextField
                                    label="💓 Heart Rate (bpm)"
                                    type="number"
                                    value={selectedReport.heartRate}
                                    onChange={(e) => setSelectedReport({ ...selectedReport, heartRate: e.target.value })}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        inputProps: {
                                            min: 0, 
                                        },
                                    }}
                                />
                                {/* Other fields */}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">Cancel</Button>
                        <Button onClick={handleUpdateReport} color="primary">Update</Button>
                    </DialogActions>
                </Dialog>

                {/* Delete confirmation dialog */}
                <Dialog
                    open={deleteConfirmationOpen}
                    onClose={() => setDeleteConfirmationOpen(false)}
                    fullScreen={isMobile}
                >
                    <DialogTitle>🗑️ Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this report?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">Cancel</Button>
                        <Button onClick={confirmDeleteReport} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default AddedReportsPage;
