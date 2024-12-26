import React from "react";

function Home() {
  return (
    <>
      {/* Main Banner Section */}
      <div
  className="bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center text-white px-4 md:px-8"
  style={{ backgroundImage: "url('./bgcs.jpg')" }}
>
        <div className="bg-black/50 p-8 rounded-lg text-center shadow-lg max-w-3xl w-full mx-4 sm:mx-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-4">
            <img
              src="logon.png"
              className="h-12 w-auto"
              alt="Logo"
            />
          </div>
          {/* Subtitle */}
          <p className="text-lg italic mb-6 font-squid">"Code, Compete, Survive"</p>
          {/* Registration Button */}
          <button className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-squid">
            Registration starts from 10 Jan, 2025
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
      </div>
    </>
  );
}

export default Home;