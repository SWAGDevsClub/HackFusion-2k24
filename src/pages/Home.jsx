import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import CountdownTimer from "../components/CountdownTimer";

function Home() {
  return (
    <>
      {/* Background Image with Opacity */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/master-mask.png')",
          backgroundSize: "45%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.15",
        }}
      />

      {/* Main Banner Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white font-bold px-4 w-full min-h-screen">
        {/* Floating Images */}
        <img
          src="/mask.png"
          alt="Mask"
          className="h-28 sm:h-30 md:h-40 absolute top-10 left-8 md:left-36 md:top-20"
        />
        <img
          src="/theboss.png"
          alt="The Boss"
          className="h-40 sm:h-48 md:h-60 absolute bottom-10 left-4 md:left-16"
        />

        {/* Main Content */}
        <div className="p-4 text-center max-w-3xl w-full mx-4 sm:mx-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img
              src="/logon.png"
              className="h-10 w-auto sm:h-12 md:h-16 md:w-[600px]"
              alt="Logo"
            />
          </div>

          {/* Subtitle */}
          <p className="text-lg italic mb-6 font-squid">"Code, Compete, Survive"</p>

          {/* Registration Button */}
          <Link to={"/registration"}>
            <button className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-squid cursor-pointer">
              Register Now
            </button>
          </Link>

          {/* Countdown Timer */}
          <CountdownTimer targetDate="2025-02-10T00:00:00" />

          {/* Logos Section */}
          <div className="flex items-center justify-center gap-4 pt-8 flex-wrap">
            <img
              src="/swag_white.png"
              alt="Swag Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 "
            />
            <img
              src="/GDG_White_logo.png"
              alt="GDG Logo"
              className="h-16 sm:h-20 w-auto"
            />
          </div>
        </div>

        {/* Right-Side Floating Image */}
        <img
          src="/gaurd.png"
          alt="Guard"
          className="h-40 sm:h-48 md:h-60 absolute bottom-10 right-4 md:right-16"
        />
      </div>
    </>
  );
}

export default Home;
