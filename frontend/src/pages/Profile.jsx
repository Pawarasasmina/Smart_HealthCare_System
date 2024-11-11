import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faCalendarAlt,
  faEnvelope,
  faUser,
  faQrcode,
  faCreditCard,
  faCamera,
  faArrowsAltV,
  faWeight,
} from "@fortawesome/free-solid-svg-icons";
import Doctor1 from "../assets/doctor1.png"; // Ensure this path is correct for your default profile picture
import Loading from "../utils/loading"; // Import the Loading component
import QRCode from "react-qr-code"; // Import QRCode from react-qr-code
import "../styles/profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    profilePicture: Doctor1, // Default profile picture
    height: "",
    weight: "",
  });
  const [showQR, setShowQR] = useState(false); // State to handle QR popup
  const [qrCodeData, setQrCodeData] = useState(""); // State to handle QR code data
  const [isScanning, setIsScanning] = useState(false);

  const fetchProfile = async () => {
    const email = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage
    if (!email) {
      console.error("No email found in session storage");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${email}`
      ); // Adjust the endpoint to include email
      const userData = response.data;
      console.log("userData:", userData); // Log the userData object
      setProfile({
        fullName: userData.name,
        email: userData.email,
        gender: userData.gender || "",
        dateOfBirth: userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
          : "",
        mobileNumber: userData.phone || "",
        profilePicture: userData.profilePicture || Doctor1,
        height: userData.height || "",
        weight: userData.weight || "",
      });

      // Set QR code data
      const qrCodeDetails = `Name: ${userData.name}, Email: ${userData.email}, Phone: ${userData.phone}, Gender: ${userData.gender}, Date of Birth: ${userData.dateOfBirth}, Height: ${userData.height}, Weight: ${userData.weight}`;
      setQrCodeData(qrCodeDetails);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleEdit = async () => {
    if (isEditing) {
      console.log(profile); // Log the values of profile
      const email = sessionStorage.getItem("userEmail"); // Retrieve email from sessionStorage

      try {
        const updatedProfile = {
          name: profile.fullName,
          email: profile.email, // Ensure email is included
          phone: profile.mobileNumber,
          gender: profile.gender || "", // Add a default value if gender is null
          dateOfBirth: profile.dateOfBirth || "", // Add a default value if dateOfBirth is null
          profilePicture: profile.profilePicture, // Use the path of the profile picture
          height: profile.height,
          weight: profile.weight,
        };

        const response = await axios.put(
          `http://localhost:3000/api/users/${email}`,
          updatedProfile
        );
        console.log("Profile updated successfully:", response.data);

        // Update QR code data here as well
        const qrCodeDetails = `Name: ${profile.fullName}, Email: ${profile.email}, Phone: ${profile.mobileNumber}, Gender: ${profile.gender}, Date of Birth: ${profile.dateOfBirth}, Height: ${profile.height}, Weight: ${profile.weight}`;
        setQrCodeData(qrCodeDetails); // Update the QR code data state

        await fetchProfile(); // Refetch the profile data after updating
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Assuming you have a function to upload the file and get the path
      const filePath = URL.createObjectURL(file); // This is just for demonstration; replace with actual upload logic
      setProfile((prev) => ({ ...prev, profilePicture: filePath }));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      sessionStorage.clear(); // Clear session storage
      console.log("User logged out");
      window.location.href = "/"; // Redirect to home page
    }
  };

  const handleScanQRCode = () => {
    console.log("Scan button clicked");
    setIsScanning(true); // Start the scanning animation

    // Simulate the scan process (you can replace this with actual scan logic)
    setTimeout(() => {
      setIsScanning(false); // Stop the scanning after a delay
      alert("Scan complete!"); // Simulate scan completion
      window.location.href = "/medical-report"; // Redirect to /medical-report
    }, 3000); // Scan lasts for 3 seconds
  };

  const handlePaymentRedirect = () => {
    // Redirect to the payment page (replace with your payment route)
    window.location.href = "/payment";
  };

  const handleQRCodePopup = () => {
    setShowQR(true);
  };

  const handleCloseQRCodePopup = () => {
    setShowQR(false);
  };

  // Show loading animation if loading
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex flex-col justify-center items-center p-6">
      <div className="relative flex flex-col sms:w-[95vw] lgs:flex-row h-auto w-auto justify-center items-center bg-white rounded-3xl shadow-lg overflow-hidden mt-8 sms:mt-10 lgs:mt-10 lgs:mb-10 mb-20">
        {/* Left Section: Profile Header, Picture & Name */}
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[30vw] lgs:h-[75vh] p-8 justify-center items-center bg-baseprimary rounded-l-3xl">
          <h2 className="font-russoone text-3xl text-white text-center mb-4">
            Profile
          </h2>
          <div className="flex justify-center mb-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white transition-transform transform hover:scale-110"
            />
          </div>
          <p className="text-white font-semibold text-xl text-center">
            {profile.fullName}
          </p>

          {/* Circle Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button
              onClick={handleQRCodePopup}
              className="flex justify-center items-center bg-opacity-30 bg-white border-2 border-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <FontAwesomeIcon
                icon={faQrcode}
                className="text-baseprimary h-8 w-8"
              />
            </button>
            <button
              onClick={handlePaymentRedirect}
              className="flex justify-center items-center bg-opacity-30 bg-white border-2 border-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-baseprimary h-8 w-8"
              />
            </button>
          </div>

          {/* Design Section with added margin for mobile view */}
          <div className="flex h-auto lgs:w-[20vw] justify-center items-center lgs:pt-5 lgs:space-x-5 mt-6">
            <div
              className="bg-primary h-[0.2rem] rounded-full w-[5rem]"
              data-aos="fade-right"
            />
            <div
              className="bg-primary h-3 w-3 rounded-full"
              data-aos="zoom-in"
            />
            <div
              className="bg-primary h-3 w-3 rounded-full"
              data-aos="zoom-in"
            />
            <div
              className="bg-primary h-[0.2rem] rounded-full w-[5rem]"
              data-aos="fade-left"
            />
          </div>
        </div>

        {/* Right Section: Profile Details */}
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[45vw] lgs:h-[75vh] justify-center items-center p-6 rounded-r-3xl">
          <h3 className="text-2xl font-semibold mb-4">Details</h3>
          <div className="flex flex-col w-full space-y-4">
            {/* Email */}
            <div className="flex items-center p-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-baseprimary h-6 mr-2"
              />
              <div className="flex justify-between w-full">
                <label className="block text-gray-700 text-lg">Email:</label>
                <p className="text-gray-800 font-normal text-lg font-russoone">
                  {profile.email}
                </p>
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
            {/* Mobile Number */}
            <div className="flex items-center p-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-baseprimary h-6 mr-2"
              />
              <div className="flex justify-between w-full">
                <label className="block text-gray-700 text-lg">Mobile:</label>
                <p className="text-gray-800 font-normal text-lg font-russoone">
                  {profile.mobileNumber}
                </p>
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
            {/* Date of Birth */}
            <div className="flex items-center p-2">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="text-baseprimary h-6 mr-2"
              />
              <div className="flex justify-between w-full">
                <label className="block text-gray-700 text-lg">DOB:</label>
                <p className="text-gray-800 font-normal text-lg font-russoone">
                  {profile.dateOfBirth}
                </p>
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
            {/* Gender */}
            <div className="flex items-center p-2">
              <FontAwesomeIcon
                icon={faUser}
                className="text-baseprimary h-6 mr-2"
              />
              <div className="flex justify-between w-full">
                <label className="block text-gray-700 text-lg">Gender:</label>
                <p className="text-gray-800 font-normal text-lg font-russoone">
                  {profile.gender}
                </p>
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
            {/* Height and Weight in one line */}
            <div className="flex items-center p-2 justify-between">
              <div className="flex items-center w-full mr-4">
                <FontAwesomeIcon
                  icon={faArrowsAltV}
                  className="text-baseprimary h-6 mr-2"
                />
                <label className="block text-gray-700 text-lg">Height:</label>
                <p className="text-gray-800 font-normal text-lg font-russoone ml-2">
                  {profile.height} cm
                </p>
              </div>
              <div className="flex items-center w-full">
                <FontAwesomeIcon
                  icon={faWeight}
                  className="text-baseprimary h-6 mr-2"
                />
                <label className="block text-gray-700 text-lg">Weight:</label>
                <p className="text-gray-800 font-normal text-lg font-russoone ml-2">
                  {profile.weight} kg
                </p>
              </div>
            </div>
            <hr className="my-2 border-gray-300" />
          </div>

          {/* Buttons in a horizontal line */}
          <div className="flex space-x-4 mt-6 w-full max-w-[300px]">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-baseprimary text-white py-2 rounded-full hover:bg-basesecondary transition-colors duration-300 transform hover:scale-105 w-full"
            >
              Edit
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition-colors duration-300 transform hover:scale-105 w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-[90%] sm:max-w-[600px] max-h-[80vh] sm:max-h-[90vh] overflow-y-auto transition-transform transform hover:scale-105 mt-10 mb-20">
            <h2 className="font-russoone text-2xl mb-4 text-center">
              Edit Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Section */}
              <div>
                {/* Name Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Name:
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-baseprimary transition duration-200"
                  />
                </div>
                {/* Gender Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Gender:
                  </label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-baseprimary transition duration-200"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                {/* Profile Picture Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faCamera} className="mr-2" />
                    Profile Picture:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="file-upload"
                      className="hidden" // Hide the default file input
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex items-center justify-center bg-baseprimary text-white py-2 px-4 rounded-full hover:bg-basesecondary transition-colors duration-300 w-32 text-center"
                    >
                      Choose File
                    </label>
                    <span className="ml-4 text-gray-800 font-normal">
                      {profile.profilePicture instanceof File
                        ? profile.profilePicture.name
                        : profile.profilePicture
                        ? "File Selected"
                        : "No File Selected"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div>
                {/* Date of Birth Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-baseprimary transition duration-200"
                  />
                </div>
                {/* Mobile Number Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Mobile Number:
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleChange}
                    className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-baseprimary transition duration-200"
                  />
                </div>
                {/* Height Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faArrowsAltV} className="mr-2" />
                    Height (cm):
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                    className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-baseprimary transition duration-200"
                    min="0" // Set minimum value for height
                  />
                </div>
                {/* Weight Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 flex items-center">
                    <FontAwesomeIcon icon={faWeight} className="mr-2" />
                    Weight (kg):
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                    className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-baseprimary transition duration-200"
                    min="0" // Set minimum value for weight
                  />
                </div>
              </div>
            </div>

            {/* Button Container */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="bg-baseprimary text-white py-2 px-4 rounded-full hover:bg-basesecondary transition-colors duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Popup */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <h2 className="font-russoone text-2xl mb-4">Your Health ID</h2>
            {/* QR Code display */}
            <div className="relative flex justify-center items-center bg-gray-200 w-48 h-48 rounded-lg mb-4">
              <QRCode value={qrCodeData} size={192} />
              {isScanning && (
                <div className="absolute inset-0 flex justify-center">
                  {/* Scanning line */}
                  <div className="scan-line"></div>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCloseQRCodePopup}
                className="bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition-colors duration-300"
              >
                Close
              </button>
              <button
                onClick={handleScanQRCode}
                className="bg-baseprimary text-white py-2 px-4 rounded-full hover:bg-basesecondary transition-colors duration-300"
              >
                Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
