import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";

function Home() {
  return (
    <>


      {/* Background Image with Opacity */}
      <div
        className="fixed inset-0 z-50"
        style={{
          backgroundImage: "url('/master-mask.png')",
          backgroundSize: '45%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '0.15'
        }}
      />


      {/* Main Banner Section */}
      <div

        className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4  text-center  w-full md:px-8 sm:flex "
      // style={{ backgroundImage: "url('./bgcs.jpg')" }}
      >
        <img
          src="/mask.png"
          alt="GDG Logo"
          className="h-40 absolute top-20 left-40"
        />
        <img
          src="/theboss.png"
          alt="GDG Logo"
          className="h-60 absolute  bottom-20 left-20"
        />
        <div className="p-8 text-center max-w-3xl w-full mx-4 sm:mx-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img
              src="/logon.png"
              className="h-12 w-80 md:h-auto md:w-[600px]"
              alt="Logo"
            />

          </div>
          {/* Subtitle */}

          <p className="text-lg italic mb-6 font-squid">"Code, Compete, Survive"</p>


          {/* Registration Button */}

          <button className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-squid cursor-pointer">
            Register Now
          </button>

          <CountdownTimer targetDate="2025-02-10T00:00:00" />

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

        <img
          src="/gaurd.png"
          alt="GDG Logo"
          className="h-60 absolute  bottom-20 right-20"
        />

        <div className="fixed top-4 right-4 group">



        </div>


      </div>


    </>
  );
}

export default Home;
