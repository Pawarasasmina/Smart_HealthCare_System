import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaCalendarAlt,
  FaHeartbeat,
  FaWeight,
  FaTachometerAlt,
  FaPrescriptionBottle,
  FaDiagnoses,
  FaTimes,
  FaMedkit,
  FaStethoscope,
} from "react-icons/fa";

const MedicalReportsDisplay = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchMedicalReports = async () => {
      const email = sessionStorage.getItem("userEmail");
      if (!email) {
        setError("No email found in session storage");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/medicalReport/email/${email}`
        );
        if (response.data.length === 0) {
          setError("No medical reports found.");
        } else {
          setReports(response.data);
        }
      } catch (error) {
        console.error("Error fetching medical reports:", error);
        setError("Failed to fetch medical reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalReports();
  }, []);

  const handleCardClick = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col w-full max-w-screen-lg bg-white shadow-lg rounded-xl p-6">
        <h2 className="font-russoone text-2xl text-center text-secondary mb-8">
          Medical Reports
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.length === 0 ? (
            <p className="text-center text-secondary text-lg font-russoone">
              No medical reports found.
            </p>
          ) : (
            reports.map((report) => (
              <div
                key={report._id}
                className="report-card bg-white shadow-xl p-5 rounded-2xl w-full mx-auto border-2 border-baseprimary transform hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => handleCardClick(report)}
              >
                <div className="flex items-center mb-4">
                  <FaUser className="text-baseprimary text-3xl mr-3" />
                  <h3 className="font-russoone text-xl text-secondary">
                    {report.patientName}
                  </h3>
                </div>
                <div className="border-b pb-2 mb-4">
                  <p className="text-sm flex items-center mb-2 text-gray-600">
                    <FaCalendarAlt className="text-baseprimary text-lg mr-2" />
                    <strong>Report Date:</strong>{" "}
                    {new Date(report.reportDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <p className="text-sm flex items-center text-gray-600">
                    <FaHeartbeat className="text-baseprimary text-lg mr-2" />
                    <strong>Heart Rate:</strong> {report.heartRate} bpm
                  </p>
                  <p className="text-sm flex items-center text-gray-600">
                    <FaTachometerAlt className="text-baseprimary text-lg mr-2" />
                    <strong>Blood Pressure:</strong> {report.bloodPressure} mmHg
                  </p>
                  <p className="text-sm flex items-center text-gray-600">
                    <FaWeight className="text-baseprimary text-lg mr-2" />
                    <strong>Weight:</strong> {report.weight} kg
                  </p>
                  <p className="text-sm flex items-center text-gray-600">
                    <FaDiagnoses className="text-baseprimary text-lg mr-2" />
                    <strong>Diagnosis:</strong> {report.diagnosis}
                  </p>
                  <p className="text-sm flex items-center text-gray-600">
                    <FaPrescriptionBottle className="text-baseprimary text-lg mr-2" />
                    <strong>Prescription:</strong> {report.prescription}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for full report view */}
      {modalOpen && selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 rounded-lg max-w-full sm:max-w-lg w-full relative shadow-2xl overflow-y-auto max-h-[98vh] lg:max-h-[85vh] lg:p-2">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10" // Updated class for positioning
              onClick={closeModal}
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-xl font-russoone text-center text-primary mb-4">
              Full Medical Report
            </h2>

            {/* Patient Details Section */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-md mb-3">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaUser className="text-baseprimary mr-2" /> Patient Details
              </h3>
              <p>
                <strong>Name:</strong> {selectedReport.patientName}
              </p>
              <p>
                <strong>Email:</strong> {selectedReport.patientEmail}
              </p>
              <p>
                <strong>Weight:</strong> {selectedReport.weight} kg
              </p>
              <p>
                <strong>Height:</strong> {selectedReport.height} cm
              </p>
            </div>

            {/* Vital Signs Section */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-md mb-3">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaHeartbeat className="text-baseprimary mr-2" /> Vital Signs
              </h3>
              <p>
                <strong>Sugar Level:</strong> {selectedReport.sugarLevel} mg/dL
              </p>
              <p>
                <strong>Heart Rate:</strong> {selectedReport.heartRate} bpm
              </p>
              <p>
                <strong>Blood Pressure:</strong> {selectedReport.bloodPressure}{" "}
                mmHg
              </p>
              <p>
                <strong>Cholesterol Level:</strong>{" "}
                {selectedReport.cholesterolLevel} mg/dL
              </p>
            </div>

            {/* Symptoms and Diagnosis Section */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-md mb-3">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaDiagnoses className="text-baseprimary mr-2" /> Symptoms &
                Diagnosis
              </h3>
              <p>
                <strong>Symptoms:</strong> {selectedReport.symptoms}
              </p>
              <p>
                <strong>Diagnosis:</strong> {selectedReport.diagnosis}
              </p>
            </div>

            {/* Treatment & Prescription Section */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-md mb-3">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaMedkit className="text-baseprimary mr-2" /> Treatment &
                Prescription
              </h3>
              <p>
                <strong>Treatment:</strong> {selectedReport.treatment}
              </p>
              <p>
                <strong>Prescription:</strong> {selectedReport.prescription}
              </p>
            </div>

            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalReportsDisplay;
