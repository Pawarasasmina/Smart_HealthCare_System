import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Adjust the import path as necessary
import doctorImage from '../assets/doctor.png'; // Adjust the import path as necessary

const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        doctorName: '',
        specialization: '',
        time: '',
        pricePerSchedule: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({
            ...doctor,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/doctors', doctor);
            alert(response.data.msg);
            setDoctor({ doctorName: '', specialization: '', time: '', pricePerSchedule: '' });
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('Failed to add doctor');
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="ml-0 sms:ml-0 md:ml-64 w-full min-h-screen bg-gray-200 flex justify-center items-center">
                <div className="sms:w-[300px] md:w-[500px] lgs:w-[600px] mx-auto p-5 bg-white rounded-lg shadow-md">
                    <img src={doctorImage} alt="Doctor" className="sms:w-20 sms:h-20 md:w-28 md:h-28 lgs:w-32 lgs:h-32 mx-auto mb-4 rounded-full border-4 border-blue-600" />
                    <h2 className="text-xl sms:text-lg md:text-2xl font-bold mb-4 text-center text-blue-600">Add Doctor</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Doctor Name:</label>
                            <input
                                type="text"
                                name="doctorName"
                                value={doctor.doctorName}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700">Specialization:</label>
                            <select
                                name="specialization"
                                value={doctor.specialization}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 sms:w-full"
                            >
                                <option value="">Select Specialization</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Dermatology">Dermatology</option>
                                <option value="Neurology">Neurology</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Time:</label>
                            <input
                                type="time"
                                name="time"
                                value={doctor.time}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Price Per Schedule:</label>
                            <input
                                type="number"
                                name="pricePerSchedule"
                                value={doctor.pricePerSchedule}
                                onChange={handleChange}
                                required
                                min="0"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
                        >
                            Add Doctor
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDoctor;
