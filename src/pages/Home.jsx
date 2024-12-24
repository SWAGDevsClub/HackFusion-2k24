import React from "react";

function Home() {
  return (
    <>
      {/* Main Banner Section */}
      <div
    className="bg-cover bg-center bg-opacity-50 bg-no-repeat h-screen flex items-center justify-center text-white"
    style={{ backgroundImage: "url('./bgcs.jpg')"}}>
        


        <div className="bg-black/50 p-8 rounded-lg text-center shadow-lg max-w-3xl ">
          {/* <h1 className="font-squid text-5xl font-bold mb-4" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>HackFusion 2.0</h1> */}
          <div className="flex items-center justify-center">
        <img
          src="logon.png"
          className="h-12 w-auto"
          alt="Logo"
          />
        </div>
          
          <p className="text-lg italic mb-6" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>"Code, Compete, Survive"</p>
          <button className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>
            Registration starts from 10 jan, 2025
          </button>
        </div>
      
        </div>
     
     
      
    </>
  );
}

export default Home;
