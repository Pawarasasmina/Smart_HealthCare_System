import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Doctor1 from "../assets/doctor1.png";
import Doctor2 from "../assets/doctor2.png"; // Add more images if needed

const Register = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: Doctor1,
      title: "Your Health, Your Schedule",
      subtitle: "Join Us Today",
      description:
        "Sign up and experience a seamless way to manage your health. Create your account now!",
    },
    {
      image: Doctor2,
      title: "Explore Our Amazing Features",
      subtitle: "Create Your Account",
      description:
        "Join our platform to book and manage your doctor appointments with ease.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-baseextra4 to-baseprimary w-full min-h-screen flex justify-center items-center p-6">
      <div className="relative flex flex-col sms:w-[95vw] lgs:flex-row h-auto w-auto justify-center items-center bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Left Section: Slider with Image & Description */}
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[30vw] lgs:h-[75vh] bg-baseprimary p-8 justify-center items-center rounded-l-3xl">
          {/* Slider */}
          <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex justify-center items-center w-full h-[60%] overflow-hidden relative">
              {/* Image Section */}
              <img
                src={slides[currentSlide].image}
                alt="Doctor"
                className="w-full object-cover transition-all duration-700 ease-in-out"
              />
            </div>

            {/* Description Section */}
            <div className="flex flex-col h-auto justify-center items-center lgs:pt-5">
              <h2 className="flex flex-col font-ibmplexsans lgs:text-md text-primary">
                {slides[currentSlide].title}
                <div className="bg-primary h-[0.15rem] w-auto" />
              </h2>
              <h2 className="font-russoone lgs:text-3xl text-primary font-normal">
                {slides[currentSlide].subtitle}
              </h2>

              {/* Paragraph Section */}
              <div className="flex flex-col h-auto justify-center items-center lgs:pt-5">
                <p
                  className="font-ibmplexsans text-primary text-md text-center"
                  style={{
                    fontWeight: "200",
                  }}
                >
                  {slides[currentSlide].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Register Form */}
        <div className="flex flex-col sms:w-full sms:h-auto lgs:w-[45vw] lgs:h-[75vh] bg-white justify-center items-center p-10 rounded-r-3xl">
          <form className="flex flex-col w-full max-w-sm space-y-6">
            {/* Full Name Input with Icon */}
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3 focus-within:ring-2 focus-within:ring-baseprimary transition-all duration-300">
              <FontAwesomeIcon icon={faUser} className="text-baseprimary h-6" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Email Input with Icon */}
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3 focus-within:ring-2 focus-within:ring-baseprimary transition-all duration-300">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-baseprimary h-6"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Password Input with Icon */}
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3 focus-within:ring-2 focus-within:ring-baseprimary transition-all duration-300">
              <FontAwesomeIcon icon={faLock} className="text-baseprimary h-6" />
              <input
                type="password"
                placeholder="Password"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Confirm Password Input with Icon */}
            <div className="flex items-center space-x-3 border border-basesecondary rounded-full p-3 focus-within:ring-2 focus-within:ring-baseprimary transition-all duration-300">
              <FontAwesomeIcon icon={faLock} className="text-baseprimary h-6" />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-baseprimary text-white rounded-full hover:bg-basesecondary transition-all duration-300 shadow-md hover:shadow-lg"
              style={{ boxShadow: "inset 0 6px 6px rgba(65,105,225,0.5)" }}
            >
              Register
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-baseextra1 mt-4">
              <p className="flex items-center justify-center space-x-1">
                <span className="text-gray-600">Already have an account?</span>
                <a
                  href="/login"
                  className="text-baseprimary font-semibold underline hover:text-basesecondary transition-colors duration-300"
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
