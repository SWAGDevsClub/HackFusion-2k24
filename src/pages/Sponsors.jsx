import React from "react";

function Sponsors() {
  return (
    <>
    <div
      className="bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center text-white"
    style={{ backgroundImage: "url('./bgcs.jpg')" }}
  >
     <div className="bg-black/50 p-8 rounded-lg text-center shadow-lg max-w-3xl">

      <h1 className="text-4xl font-bold text-center py-4" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>Our Sponsors</h1>
      <h1 className="text-3xl font-bold text-center py-4" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>Coming Soon......</h1>
      {/* <div className="flex flex-wrap justify-center items-center space-x-6">
        <img src="https://placehold.co/150x50" alt="Sponsor 1" className="w-40 h-auto" />
        <img src="https://placehold.co/150x50" alt="Sponsor 2" className="w-40 h-auto" />
        <img src="https://placehold.co/150x50" alt="Sponsor 3" className="w-40 h-auto" />
      </div> */}

      
    </div>
    </ div>
    </>
  );
}

export default Sponsors;
