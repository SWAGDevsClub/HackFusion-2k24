import React from "react";

const RegistrationSuccess = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#200f31] to-[#613b69]">
      <div className="bg-pink-200 shadow-md rounded px-8 py-6 w-96 text-center">
        <h1 className="text-3xl font-squid text-green-700 mb-4">
          Registration Successful!
        </h1>
        <p className="text-gray-700 font-ssquid">
          Thank you for registering. Your details have been submitted successfully.
        </p>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-green-700 font-squid"
          onClick={() => (window.location.href = "/")} // Redirect to the home page
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
