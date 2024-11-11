import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaChair,
  FaHistory, // History icon for the floating button
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DisplayAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAppointments, setSelectedAppointments] = useState([]); // State to track selected appointments
  const [showPaymentHistory, setShowPaymentHistory] = useState(false); // Toggle modal visibility
  const [payments, setPayments] = useState([]); // State for payment history
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      const email = sessionStorage.getItem("userEmail"); // Get userEmail from sessionStorage
      if (!email) {
        setError("No email found in session storage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/appointments/${email}`
        );
        if (response.data.length === 0) {
          setError("No appointments available for payment."); // Set error if no appointments
        } else {
          setAppointments(response.data); // Set appointments if found
        }
      } catch (error) {
        console.error("Error fetching appointments:", error); // Log error for debugging
        setError("Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Fetch payment history from backend
  const fetchPaymentHistory = async () => {
    const email = sessionStorage.getItem("userEmail"); // Get userEmail from sessionStorage
    if (!email) return;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/payments/payments/${email}`
      );
      setPayments(response.data.payments || []);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const handleSelectAppointment = (appointmentId) => {
    setSelectedAppointments((prev) =>
      prev.includes(appointmentId)
        ? prev.filter((id) => id !== appointmentId)
        : [...prev, appointmentId]
    );
  };

  const totalCharge = selectedAppointments.reduce((sum, id) => {
    const appointment = appointments.find((appt) => appt._id === id);
    return appointment ? sum + appointment.charge : sum;
  }, 0);

  const handleProceedToPayment = () => {
    if (!selectedAppointments || selectedAppointments.length === 0) {
      alert("No appointments selected.");
      return;
    }

    navigate("/payment-process", {
      state: { selectedAppointments, totalCharge },
    });
  };

  const togglePaymentHistory = () => {
    setShowPaymentHistory(!showPaymentHistory);
    fetchPaymentHistory();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex justify-center items-center p-4">
      <div className="relative flex h-auto w-full justify-center items-center mt-16 mb-24">
        <div className="flex flex-col w-full max-w-screen-lg bg-primary drop-shadow-lg items-center justify-center rounded-3xl p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {appointments.length === 0 ? (
              <p className="text-center text-secondary text-lg font-russoone">
                No appointments available for payment.
              </p>
            ) : (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className={`appointment-card bg-white shadow-lg p-6 rounded-xl w-full mx-auto transition-transform transform hover:scale-105 duration-300 ease-in-out ${
                    selectedAppointments.includes(appointment._id)
                      ? "border-2 border-blue-500"
                      : ""
                  } relative`}
                  onClick={() => handleSelectAppointment(appointment._id)}
                >
                  {selectedAppointments.includes(appointment._id) && (
                    <div className="absolute top-3 right-3 text-green-500 text-2xl">
                      ✔️
                    </div>
                  )}
                  <div className="flex items-center mb-4">
                    <FaCalendarAlt className="text-primary text-3xl mr-3" />
                    <h3 className="font-russoone text-xl text-primary">
                      Appointment #{appointment.appointmentNo}
                    </h3>
                  </div>
                  <div className="border-b pb-4 mb-4">
                    <p className="text-md flex items-center mb-2">
                      <FaUserMd className="text-secondary text-lg mr-2" />
                      <strong>Doctor:</strong> {appointment.doctorName}
                    </p>
                    <p className="text-md flex items-center mb-2">
                      <strong>Specialization:</strong>{" "}
                      {appointment.specialization}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-md flex items-center">
                      <FaCalendarAlt className="text-secondary text-lg mr-2" />
                      <strong>Date:</strong>{" "}
                      {new Date(appointment.date).toLocaleDateString()}
                    </p>
                    <p className="text-md flex items-center">
                      <FaClock className="text-secondary text-lg mr-2" />
                      <strong>Time:</strong> {appointment.appointmentTime}
                    </p>
                    <p className="text-md flex items-center">
                      <FaDollarSign className="text-secondary text-lg mr-2" />
                      <strong>Charge:</strong> ${appointment.charge}
                    </p>
                    <p className="text-md flex items-center">
                      <FaChair className="text-secondary text-lg mr-2" />
                      <strong>Seat No:</strong> {appointment.seatNo}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Payment History Button */}
      <div className="fixed lg:top-20 lg:left-10 left-5 top-12">
        <button
          className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          onClick={togglePaymentHistory}
        >
          <FaHistory size={24} />
        </button>
      </div>

      {showPaymentHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-6 relative space-y-4 max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
            {" "}
            {/* Set max-height for mobile responsiveness */}
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setShowPaymentHistory(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {payments.length === 0 ? (
                <p className="text-center">No previous payments found.</p>
              ) : (
                payments.map((payment) => (
                  <div key={payment._id} className="bg-gray-100 p-4 rounded-lg">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Amount:</strong> ${payment.amount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Tax:</strong> ${payment.tax.toFixed(2)}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> $
                      {payment.totalAmount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {payment.paymentMethod}
                    </p>
                    <p>
                      <strong>Status:</strong> {payment.status}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Proceed to Payment Button */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 lg:bottom-12 lg:left-auto lg:right-16 flex justify-center">
        <button
          className={`bg-blue-500 text-white font-bold py-3 px-6 rounded-full transition-transform duration-300 ease-in-out ${
            totalCharge > 0 ? "opacity-100" : "opacity-50 cursor-not-allowed"
          }`}
          disabled={totalCharge === 0}
          onClick={handleProceedToPayment}
        >
          Proceed to Payment (${totalCharge})
        </button>
      </div>
    </div>
  );
};

export default DisplayAppointments;
