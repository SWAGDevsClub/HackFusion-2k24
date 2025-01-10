import React from "react";

function Schedule() {
  return (
    <>
      
  
    <div class="container mx-auto mb-20 py-16">
    <div class="flex flex-col">
      <nav class="flex justify-center space-x-4 mb-8" id="TopicTab" role="tablist">
        
        <a
          class="text-center px-6 py-4 bg-pink-500 text-white font-bold rounded-md shadow-md hover:bg-pink-600 transition duration-300 active"
          id="home-tab"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          <h2 class="text-lg">Day 1</h2>
          <p class="text-sm">13 Nov, 2019 [09.00am - 04.00pm]</p>
        </a>
  
       
        <a
          class="text-center px-6 py-4 bg-gray-200 text-gray-700 font-bold rounded-md shadow-md hover:bg-gray-300 transition duration-300"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          <h2 class="text-lg">Day 2</h2>
          <p class="text-sm">13 Nov, 2019 [09.00am - 04.00pm]</p>
        </a>
  
        
        <a
          class="text-center px-6 py-4 bg-gray-200 text-gray-700 font-bold rounded-md shadow-md hover:bg-gray-300 transition duration-300"
          id="contact-tab"
          data-toggle="tab"
          href="#contact"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          <h2 class="text-lg">Day 3</h2>
          <p class="text-sm">13 Nov, 2019 [09.00am - 04.00pm]</p>
        </a>
      </nav>
  
      <div class="tab-content">
       
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <ul class="space-y-4">
            <li class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
              <h4 class="text-pink-500 font-bold">9.00am</h4>
              <div class="flex-1 px-4">
                <h3 class="text-lg font-bold mb-2">Introduction of Material Design</h3>
                <span class="text-sm font-semibold">By Risabh Moinul</span>
                <p class="text-sm text-gray-600">CEO of Themefisher</p>
              </div>
              <div class="w-20">
                <img src="images/about/wordpress.png" alt="" class="rounded-lg" />
              </div>
            </li>
  
            <li class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
              <h4 class="text-pink-500 font-bold">12.20pm</h4>
              <div class="flex-1 px-4">
                <h3 class="text-lg font-bold mb-2">Marketing Matters in Design Area</h3>
                <span class="text-sm font-semibold">By Risabh Moinul</span>
                <p class="text-sm text-gray-600">CEO of Themefisher</p>
              </div>
              <div class="w-20">
                <img src="images/about/big-data.png" alt="" class="rounded-lg" />
              </div>
            </li>
  
            <li class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
              <h4 class="text-pink-500 font-bold">2.20pm</h4>
              <div class="flex-1 px-4">
                <h3 class="text-lg font-bold mb-2">Launch Break</h3>
                <p class="text-sm text-gray-600">
                  Doloribus veritatis, placeat, laborum amet voluptates cupiditate sapiente.
                </p>
              </div>
              <div class="w-20">
                <img src="images/about/lunch.jpg" alt="" class="rounded-lg" />
              </div>
            </li>
  
            <li class="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
              <h4 class="text-pink-500 font-bold">2.40pm</h4>
              <div class="flex-1 px-4">
                <h3 class="text-lg font-bold mb-2">Cultures of Creativity</h3>
                <span class="text-sm font-semibold">By Risabh Moinul</span>
                <p class="text-sm text-gray-600">CEO of Themefisher</p>
              </div>
              <div class="w-20">
                <img src="images/about/creativity.jpg" alt="" class="rounded-lg" />
              </div>
            </li>
          </ul>
        </div>
  
      </div>
    </div>
  </div>
  
    </>
  );
}

export default Schedule;
