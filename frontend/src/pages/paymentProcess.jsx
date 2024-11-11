import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaCreditCard,
  FaPaypal,
  FaShieldAlt,
} from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For better table formatting

const PaymentProcess = () => {
  const location = useLocation();
  const { selectedAppointments = [], totalCharge = 0 } = location.state || {};

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(false);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const taxRate = 0.025;

  useEffect(() => {
    const fetchProfile = async () => {
      const email = sessionStorage.getItem("userEmail");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${email}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleConfirmPayment = async () => {
    setLoadingModalVisible(true);
    const calculatedTotalWithTax = totalCharge + totalCharge * taxRate;
    setTotalWithTax(calculatedTotalWithTax);

    setTimeout(() => {
      setLoadingModalVisible(false);
      setSummaryVisible(true);
    }, 3000);
  };

  const handleDone = async () => {
    // Destructure selectedAppointments and totalCharge from location.state
    const { selectedAppointments = [], totalCharge = 0 } = location.state || {};

    // Check if selectedAppointments and totalCharge are defined
    if (!selectedAppointments || selectedAppointments.length === 0) {
      alert("No appointments selected.");
      return;
    }

    try {
      // Prepare data for backend
      const paymentData = {
        userEmail: profile.email,
        appointmentIds: selectedAppointments, // Pass the entire selectedAppointments array
        paymentMethod,
        amount: totalCharge.toFixed(2),
        tax: (totalCharge * taxRate).toFixed(2),
        totalAmount: totalWithTax.toFixed(2),
      };

      // Log payment data for debugging
      console.log("Payment Data:", paymentData);

      // Send data to backend
      const response = await axios.post(
        "http://localhost:3000/api/payments/payment",
        paymentData
      );

      if (response.status === 201) {
        alert("Payment successful! Appointments deleted.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }

    // Close summary modal after the action is completed
    closeSummaryModal();
  };

  const formatCardNumber = (number) => {
    const lastFourDigits = number.slice(-4);
    return "**** **** **** " + lastFourDigits;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(16);
    doc.text("Payment Confirmation", 20, 20);

    // Payment summary table
    doc.autoTable({
      margin: { top: 30 },
      head: [["Field", "Details"]],
      body: [
        ["Name", profile.name],
        ["Email", profile.email],
        ["Total Amount", `$${totalWithTax.toFixed(2)}`],
        ["Tax (2.5%)", `$${(totalCharge * taxRate).toFixed(2)}`],
        [
          "Payment Method",
          paymentMethod === "credit" || paymentMethod === "debit"
            ? formatCardNumber(cardNumber)
            : paymentMethod,
        ],
        ["Date", currentDate],
        ["Status", "Success"],
      ],
    });

    doc.save("payment_confirmation.pdf");
  };

  const closeSummaryModal = () => {
    setSummaryVisible(false);
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary min-h-screen flex flex-col items-center justify-center p-6">
      <div className="mb-24 mt-16">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* User Details Section */}
            <div className="bg-gray-100 rounded-lg p-4 transition-transform duration-300 hover:shadow-lg">
              <h2 className="text-xl font-bold mb-3">User Information</h2>
              <p className="flex items-center mb-2">
                <FaUser className="mr-2 text-gray-600" />
                <span>Name: {profile.name}</span>
              </p>
              <p className="flex items-center mb-2">
                <FaUser className="mr-2 text-gray-600" />
                <span>Email: {profile.email}</span>
              </p>
              <p className="flex items-center mb-2">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                <span>Date: {currentDate}</span>
              </p>
              <p className="flex items-center mb-2">
                <FaClock className="mr-2 text-gray-600" />
                <span>Time: {currentTime}</span>
              </p>
            </div>

            {/* Payment Info Section */}
            <div className="bg-gray-100 rounded-lg p-4 transition-transform duration-300 hover:shadow-lg">
              <h2 className="text-xl font-bold mb-3">Payment Information</h2>
              <p className="text-lg font-semibold mb-2">
                <FaDollarSign className="inline-block mr-2" />
                Total Charge:{" "}
                <span className="text-green-500">
                  ${totalCharge.toFixed(2)}
                </span>
              </p>
              <p className="text-lg font-semibold mb-2">
                Tax (2.5%):{" "}
                <span className="text-green-500">
                  ${(totalCharge * taxRate).toFixed(2)}
                </span>
              </p>
              <p className="text-lg font-semibold">
                Total Amount:{" "}
                <span className="text-green-500">
                  ${totalWithTax.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-gray-100 rounded-lg p-4 mt-4 transition-transform duration-300 hover:shadow-lg">
            <h2 className="text-xl font-bold mb-3">Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="p-2 border rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="insurance">Insurance</option>
            </select>

            {/* Payment Method Specific Fields */}
            {(paymentMethod === "credit" || paymentMethod === "debit") && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center mb-2">
                    <FaCreditCard className="mr-2" />
                    Card Number:
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div>
                  <label className="flex items-center mb-2">
                    <FaUser className="mr-2" />
                    Name on Card:
                  </label>
                  <input
                    type="text"
                    className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center mb-2">
                      <FaCalendarAlt className="mr-2" />
                      Expiration Date:
                    </label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="flex items-center mb-2">
                      <FaShieldAlt className="mr-2" />
                      CVV:
                    </label>
                    <input
                      type="text"
                      className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}
            {paymentMethod === "paypal" && (
              <div>
                <FaPaypal className="mr-2" />
                <label className="mr-2">PayPal Email:</label>
                <input
                  type="email"
                  className="p-2 border rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your-email@example.com"
                />
              </div>
            )}
          </div>

          {/* Confirm Payment Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleConfirmPayment}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>

      {/* Loading Modal */}
      {loadingModalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="loader mb-4"></div> {/* Loader centered */}
            <p className="text-lg font-bold">
              Processing payment, please wait...
            </p>
          </div>
        </div>
      )}

      {/* Payment Summary Modal */}
      {summaryVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center sm:max-w-sm">
            {" "}
            {/* Updated width for mobile */}
            <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
            <p>
              <FaUser className="inline-block mr-2 text-gray-600" />
              Name: {profile.name}
            </p>
            <p>
              <FaUser className="inline-block mr-2 text-gray-600" />
              Email: {profile.email}
            </p>
            <p>
              <FaDollarSign className="inline-block mr-2 text-gray-600" />
              Amount: ${totalCharge.toFixed(2)}
            </p>
            <p>
              <FaDollarSign className="inline-block mr-2 text-gray-600" />
              Tax (2.5%): ${(totalCharge * taxRate).toFixed(2)}
            </p>
            <p>
              <FaDollarSign className="inline-block mr-2 text-gray-600" />
              Total Amount: ${totalWithTax.toFixed(2)}
            </p>
            <p>
              <FaCreditCard className="inline-block mr-2 text-gray-600" />
              Payment Method:{" "}
              {paymentMethod === "credit" || paymentMethod === "debit"
                ? formatCardNumber(cardNumber)
                : paymentMethod}
            </p>
            <p>
              <FaCalendarAlt className="inline-block mr-2 text-gray-600" />
              Date: {currentDate}
            </p>
            <p>Status: Success</p>
            <div className="mt-6">
              <button
                onClick={downloadPDF}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Download PDF
              </button>
              <button
                onClick={handleDone} // Instead of closeSummaryModal, use handleDone
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ml-4"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProcess;
