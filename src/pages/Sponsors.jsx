import React from "react";

function Sponsors() {
  return (
    <>
    {/* <div
      className="absolute z-40 inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen text-white"
  >
     <div className="bg-black/50 p-8 rounded-lg text-center shadow-lg max-w-3xl">

      <h1 className="text-4xl font-bold text-center py-4 font-squid">Our Sponsors</h1>
      <h1 className="text-3xl font-bold text-center py-4 font-squid">Coming Soon......</h1> */}
      {/* <div className="flex flex-wrap justify-center items-center space-x-6">
        <img src="https://placehold.co/150x50" alt="Sponsor 1" className="w-40 h-auto" />
        <img src="https://placehold.co/150x50" alt="Sponsor 2" className="w-40 h-auto" />
        <img src="https://placehold.co/150x50" alt="Sponsor 3" className="w-40 h-auto" />
      </div> */}

      
    {/* </div>
    </ div> */}
    <div className="absolute z-50 inset-0 overflow-y-scroll">

<section class="text-white body-font ">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <img class="object-cover object-center rounded h-720 w-600" alt="hero" src="msk.png"/>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">A Fusion of Ideas, Code,
        <br class="hidden lg:inline-block"/>and Excitement!
      </h1>
      <p class="mb-8 leading-relaxed">Join us for a thrilling and bigger than ever event - HACKFUSION! Immerse yourself in the lively atmosphere of the Shri Guru Gobind Singhji Institute of Engineering and Technology campus.
      </p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Rule Book</button>
        
      </div>
    </div>
  </div>
</section>

<section class="text-white body-font">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <p class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Dive into Excitement with a ₹2,00,000 Prize Pool! , Use Tezos blockchain for an extra ₹40,000 boost in your solution.
        <br class="hidden lg:inline-block" />
      </p>
      <p class="mb-8 leading-relaxed">Experience the Tezos blockchain Technology workshop firsthand!
      </p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">Watch here</button>
      </div>
    </div>
    <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img class="object-cover object-center rounded" alt="hero" src="army.png"/>
    </div>
  </div>
</section>
</div>
    </>
  );
}

export default Sponsors;
