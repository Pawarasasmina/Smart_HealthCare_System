import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Import the sidebar
import UpdateDoctorModal from '../components/UpdateDoctorModal'; // Import the modal
import doctorImage from '../assets/doctor.png'; // Default doctor image

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/doctors');
                setDoctors(response.data);
            } catch (err) {
                setError("Failed to fetch doctors");
                console.error("Error fetching doctors:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const deleteDoctor = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/api/doctors/${id}`);
            setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== id));
            alert("Doctor deleted successfully");
        } catch (err) {
            console.error("Error deleting doctor:", err);
            alert("Failed to delete doctor: " + err.message);
        }
    };

    const deleteAllDoctors = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete all doctors?");
        if (!confirmDelete) return;

        try {
            await axios.delete('http://localhost:3000/api/doctors');
            setDoctors([]);
            alert("All doctors deleted successfully");
        } catch (err) {
            console.error("Error deleting doctors:", err);
            alert("Failed to delete doctors: " + err.message);
        }
    };

    const handleUpdateClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const updateDoctor = async (updatedDoctor) => {
        try {
            await axios.put(`http://localhost:3000/api/doctors/${updatedDoctor._id}`, updatedDoctor);
            setDoctors((prevDoctors) =>
                prevDoctors.map((doc) => (doc._id === updatedDoctor._id ? updatedDoctor : doc))
            );
            alert("Doctor updated successfully");
        } catch (err) {
            console.error("Error updating doctor:", err);
            alert("Failed to update doctor: " + err.message);
        }
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-0 md:ml-64 w-full p-5 bg-gray-100"> {/* Mobile responsive margin */}
                <div className="max-w-full mx-auto p-5 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">List of Doctors</h2>
                    <button
                        onClick={deleteAllDoctors}
                        className="mb-4 w-full md:w-auto bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-200"
                    >
                        Delete All Doctors
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {doctors.map((doctor) => (
                            <div key={doctor._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200 flex flex-col items-center">
                                {/* Doctor Image */}
                                <img 
                                    src={doctor.imageUrl || doctorImage} // Use doctor's image or default image
                                    alt={`Dr. ${doctor.doctorName}`} 
                                    className="w-24 h-24 rounded-full border-2 border-blue-600 mb-2 object-cover"
                                />
                                <h3 className="font-bold text-lg">Dr. {doctor.doctorName}</h3>
                                <p className="text-sm">Doctor ID: {doctor.doctorId}</p>
                                <p className="text-sm">Specialization: {doctor.specialization}</p>
                                <p className="text-sm">Time: {doctor.time}</p>
                                <p className="text-sm">Price per Schedule: Rs. {doctor.pricePerSchedule}</p>
                                <div className="mt-2 flex space-x-2">
                                    <button
                                        onClick={() => handleUpdateClick(doctor)}
                                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => deleteDoctor(doctor._id)}
                                        className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showModal && (
                        <UpdateDoctorModal
                            doctor={selectedDoctor}
                            onUpdate={updateDoctor}
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;
