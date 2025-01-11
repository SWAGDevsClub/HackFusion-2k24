import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      {/* Main Banner Section */}
      <div
        className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4  text-center  w-full md:px-8 sm:flex overflow-y-scroll"
        // style={{ backgroundImage: "url('./bgcs.jpg')" }}
      >
        <img
          src="/man.png"
          alt="GDG Logo"
          className="w-auto h-24 sm:h-20"
        />
        <div className="p-8 text-center max-w-3xl w-full mx-4 sm:mx-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img src="logon.png" className="h-auto w-85" alt="Logo" />
          </div>
          {/* Subtitle */}

          <p className="text-lg italic mb-6 font-squid">"Code, Compete, Survive"</p>


          {/* Registration Button */}

          <button className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-squid cursor-pointer">
            Registrations will start from 2025, 15th Jan *
          </button>

          {/* Logos Section */}
          <div className="flex items-center justify-center gap-4 pt-8 flex-wrap">
            <img
              src="/swag_white.png"
              alt="Swag Logo"
              className="w-24 h-24 sm:w-20 sm:h-20"
            />
            <img
              src="/GDG_White_logo.png"
              alt="GDG Logo"
              className="h-24 w-auto sm:h-20"
            />
          </div>
        </div>
        <img src="/doll.png" alt="GDG Logo" className="h-24 w-auto sm:h-20" />
      </div>

      
    </>
  );
}

export default Home;
