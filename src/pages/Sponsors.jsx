import React from "react";
import React1, { useState } from 'react';



function Sponsors() {

  const [activeTab, setActiveTab] = useState('day1');

  const scheduleData = {
    day1: [
      {
        time: '9.00am',
        title: 'Introduction of Material Design',
        speaker: 'Risabh Moinul',
        role: 'CEO of Themefisher',
        image: '/api/placeholder/80/80'
      },
      {
        time: '12.20pm',
        title: 'Marketing Matters in Design Area',
        speaker: 'Risabh Moinul',
        role: 'CEO of Themefisher',
        image: '/api/placeholder/80/80'
      },
      {
        time: '2.20pm',
        title: 'Launch Break',
        description: 'Doloribus veritatis, placeat, laborum amet voluptates cupiditate sapiente.',
        image: '/api/placeholder/80/80'
      },
      {
        time: '2.40pm',
        title: 'Cultures of Creativity',
        speaker: 'Risabh Moinul',
        role: 'CEO of Themefisher',
        image: '/api/placeholder/80/80'
      }
    ],
    day2: [
      {
        time: '9.00am',
        title: 'Web Design Principles',
        speaker: 'Sarah Johnson',
        role: 'Lead Designer',
        image: '/api/placeholder/80/80'
      },
      {
        time: '12.00pm',
        title: 'User Experience Workshop',
        speaker: 'Mike Chen',
        role: 'UX Researcher',
        image: '/api/placeholder/80/80'
      }
    ],
    day3: [
      {
        time: '10.00am',
        title: 'Future of Frontend Development',
        speaker: 'Emily Davis',
        role: 'Senior Developer',
        image: '/api/placeholder/80/80'
      },
      {
        time: '1.00pm',
        title: 'Responsive Design Masterclass',
        speaker: 'Alex Turner',
        role: 'Tech Lead',
        image: '/api/placeholder/80/80'
      }
    ]
  };

  const tabs = [
    { id: 'day1', label: 'Day 1', date: '13 Nov, 2019' },
    { id: 'day2', label: 'Day 2', date: '14 Nov, 2019' },
    { id: 'day3', label: 'Day 3', date: '15 Nov, 2019' }
  ];


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
      <div className="absolute z-30 inset-0 overflow-y-scroll">
        <section class="text-white body-font ">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                class="object-cover object-center rounded h-720 w-600"
                alt="hero"
                src="sqr.png"
              />
            </div>
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white font-squid drop-shadow-[0_0_10px_#ff69b4]">
                A Fusion of Ideas, Code,
                <br class="hidden lg:inline-block font-squid" />
                and Excitement!
              </h1>
              <p class="mb-8 leading-relaxed font-serif">
                Join us for a thrilling and bigger than ever event - HACKFUSION!
                Immerse yourself in the lively atmosphere of the Shri Guru
                Gobind Singhji Institute of Engineering and Technology campus.
              </p>
              <div class="flex justify-center">
                <button class="font-squid inline-flex text-white bg-pink-500  py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg border-0 hover:shadow-[0_0_20px_5px] hover:shadow-pink-800">
                  Rule Book
                </button>
              </div>
            </div>
          </div>
        </section>
        <section class="text-white body-font ">
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white font-squid drop-shadow-[0_0_10px_#ff69b4]">
                ₹2,00,000 Prize Pool!
                <br class="hidden lg:inline-block font-squid" />

              </h1>
              <p class="mb-4 leading-relaxed font-serif text-2xl">
                Dive into Excitement with a ₹2,00,000 Prize Pool! , Use Tezos
                blockchain for an extra ₹40,000 boost in your solution.
              </p>
              <p class="mb-8 leading-relaxed font-serif">
                Experience the Tezos blockchain Technology workshop firsthand!
              </p>
              <div class="flex justify-center">
                <button class="font-squid inline-flex text-white bg-pink-500  py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg border-0 hover:shadow-[0_0_20px_5px] hover:shadow-pink-800">
                  Watch here
                </button>
              </div>
            </div>
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                class="object-cover object-center rounded h-720 w-600"
                alt="hero"
                src="/army.png"
              />
            </div>
          </div>
        </section>

        <section className="text-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {/* Card 1 */}
              <div className="p-4 lg:w-1/3">
                <div className="h-80 bg-[#000957] bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative transform transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_30px_10px_rgba(255,105,180,0.8)]">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] font-squid">
                    ₹1,00,000 Prize Pool
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Exciting awards and gifts for the best solutions of problem
                    statement!! Don't miss this chance to showcase your talents
                    and be recognized for the best solutions.
                  </p>
                  <a
                    href="#"
                    className="text-pink-500 inline-flex items-center hover:text-pink-600"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              {/* Card 2 */}
              <div className="p-4 lg:w-1/3">
                <div className="h-80 bg-[#000957] bg-opacity-75 px-4 pt-8 pb-24 rounded-lg overflow-hidden text-center relative transform transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_30px_10px_rgba(255,105,180,0.8)]">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] font-squid">
                    Great Community
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Embark on a journey of collaboration and knowledge exchange
                    as you seize networking opportunities with fellow
                    enthusiasts and industry experts. Don't just win an award,
                    create lasting connections that propel your success to new
                    heights!        
                  </p>
                  <a
                    href="#"
                    className="text-pink-500 inline-flex items-center hover:text-pink-600"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
              {/* Card 3 */}
              <div className="p-4 lg:w-1/3">
                <div className="h-80 bg-[#000957] bg-opacity-75 px-8 pt-8 pb-24 rounded-lg overflow-hidden text-center relative transform transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_30px_10px_rgba(255,105,180,0.8)]">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] font-squid">
                    36+ Hours
                  </h1>
                  <p className="leading-relaxed mb-3 ">
                    Immerse yourself in two days of intense brainstorming and
                    coding sessions, where innovation takes center stage. Engage
                    in dynamic discussions, exchange ideas with top-notch
                    professionals, and harness the power of collaborative
                    problem-solving.
                  </p>
                  <a
                    href="#"
                    className="text-pink-500 inline-flex items-center hover:text-pink-600"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-center items-center gap-6"
        >
          {/* Package 1 */}
          <div className="w-full md:w-1/2 lg:w-1/3 "   >
            <div className=" shadow-lg rounded-lg p-6 bg-gradient-to-t from-purple-900 via-pink-800 to-pink-900 hover:shadow-[0_0_30px_10px_rgba(255,105,180,0.5)]"
            >
              {/* Price Header */}
              <div className="flex flex-col items-center mb-4 ">
                <div className="text-pink-500 text-5xl ">
                  <img src="/pep.png" alt="" className="h-20" />                  
                </div>
                <h2 className="text-4xl font-bold text-white mt-4 font-squid">₹749/-</h2>
              </div>
              {/* Package Name */}
              <h6 className="text-center text-lg font-semibold text-white mb-4 border-2 rounded-lg font-squid">Early</h6>
              {/* List */}
              <ul className="list-none text-white text-sm space-y-2 text-center font-mono">
                <li>₹1,00,000 Prize pool</li>
                <li>Fun and Enjoyment </li>
                <li>Certificate of participation </li>
                <li>Skill Development  </li>
                <li>Networking Opportunities        </li>
                <li>Portfolio Enhancement </li>
                <li>Career Advancement </li>
                <li>Personal Growth</li>
                <li>Internship Oppurtunity</li>


              </ul>
              {/* Button */}
              <div className="text-center mt-6">
                <a
                  href="#"
                  className="font-squid bg-pink-400 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
                >
                  Get now
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="container mx-auto my-20">
          <div className="flex flex-col">
            <nav className="flex justify-center space-x-4 mb-8" role="tablist">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-center px-6 py-4 font-bold rounded-md shadow-md transition duration-300 ${activeTab === tab.id
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  <h2 className="text-lg">{tab.label}</h2>
                  <p className="text-sm">{tab.date}</p>
                </button>
              ))}
            </nav>

            <div className="tab-content">
              <ul className="space-y-4">
                {scheduleData[activeTab].map((item, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
                    <h4 className="text-pink-500 font-bold">{item.time}</h4>
                    <div className="flex-1 px-4">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      {item.speaker && (
                        <>
                          <span className="text-sm font-semibold">By {item.speaker}</span>
                          <p className="text-sm text-gray-600">{item.role}</p>
                        </>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )}
                    </div>
                    <div className="w-20">
                      <img src={item.image} alt="" className="rounded-lg" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="text-white body-font">

          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-6xl font-bold title-font mb-4 text-center font-squid">Winners</h1>
            <p className="text-2xl text-white mb-8 text-center font-squid">Previous Year</p>
            <div className="flex flex-wrap -m-4">
              {/* Card 1 */}
              <div className="p-4 md:w-1/3">

                <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_10px_rgba(255,105,180,0.5)]">
                  <img
                    className="object-cover object-center rounded h-64 sm:h-72 md:h-80 lg:h-80 w-full"
                    src="https://dummyimage.com/720x400"
                    alt="blog"
                  />
                  <div className="p-6 bg-[#000957] bg-opacity-75">
                    <h2 className="tracking-widest text-lg title-font font-medium text-white mb-1">
                      Team Never-Selected
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                      Winners
                    </h1>
                    <p className="leading-relaxed mb-3">
                      Experience the triumph of Never-Selected!
                    </p>

                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className="p-4 md:w-1/3">
                <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_10px_rgba(0,150,255,0.5)]">
                  <img
                    className="object-cover object-center rounded h-64 sm:h-72 md:h-80 lg:h-80 w-full"
                    src="https://dummyimage.com/721x401"
                    alt="blog"
                  />
                  <div className="p-6 bg-[#000957] bg-opacity-75">
                    <h2 className="tracking-widest text-lg title-font font-medium text-white-400 mb-1">
                      Team Loosers
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                      1st Runner Up
                    </h1>
                    <p className="leading-relaxed mb-3">
                      A remarkable performance by Team Loosers!
                    </p>

                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="p-4 md:w-1/3">
                <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_10px_rgba(0,255,150,0.5)]">
                  <img
                    className="object-cover object-center rounded h-64 sm:h-72 md:h-80 lg:h-80 w-full"
                    src="https://dummyimage.com/722x402"
                    alt="blog"
                  />
                  <div className="p-6 bg-[#000957] bg-opacity-75">
                    <h2 className="tracking-widest text-lg title-font font-medium text-white-400 mb-1">
                      Team Nextains
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                      2nd Runner Up
                    </h1>
                    <p className="leading-relaxed mb-3">
                      Applaud the brilliance of Team Nextains!
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="text-gray-600 body-font">

          <div class="container px-4 py-24 mx-auto mb-0">
            <h1 className="text-6xl font-bold title-font mb-2 text-center text-white font-squid">Sponsers</h1>

            <h1 className="text-2xl font-bold title-font mb-2 text-white font-squid">Title Sponser</h1>
            <div class="flex flex-wrap -m-4">
              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                </a>

              </div>

              <div class="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
            </div>
          </div>
        </section>

        <section class="text-gray-600 body-font">

          {/* Second Section without vertical gap */}
          <div class="container px-4 mx-auto mb-20">
            <h1 className="text-3xl font-bold title-font mb-2 text-white font-squid">Track Sponsor</h1>
            <div class="flex flex-wrap -m-4">


              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
            </div>
          </div>
        </section>

        <section class="text-gray-600 body-font">

          {/* Second Section without vertical gap */}
          <div class="container px-4 mx-auto mb-20">
            <h1 className="text-3xl font-bold title-font mb-2 text-white font-squid">Web Hosting Partner</h1>
            <div class="flex flex-wrap -m-4">


              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
            </div>
          </div>
        </section>


        <section class="text-gray-600 body-font">

          {/* Second Section without vertical gap */}
          <div class="container px-4 mx-auto mb-20">
            <h1 className="text-3xl font-bold title-font mb-2 text-white font-squid">Platform Partner</h1>
            <div class="flex flex-wrap -m-4">


              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
            </div>
          </div>
        </section>

        <section class="text-gray-600 body-font">

          {/* Second Section without vertical gap */}
          <div class="container px-4 mx-auto mb-20">
            <h1 className="text-3xl font-bold title-font mb-2 text-white font-squid">Community Partners</h1>
            <div class="flex flex-wrap -m-4">


              <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
              <div class="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
              <div class="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                <a class="block relative h-48 rounded overflow-hidden">
                  <img alt="ecommerce" class="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>

            </div>
          </div>
        </section>

        <section class="cta-2 py-12">
  <div class="container mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
      
      
      <div class="w-auto flex justify-center">
        <img 
          src="/dolls.png" 
          alt="Rotating Image" 
          class="shadow-lg h-40 w-40 sm:h-48 sm:w-48 md:h-2/3 md:w-2/3 rounded-full transform transition-transform duration-700 ease-in-out hover:rotate-[360deg] hover:scale-50 hover:shadow-2xl" 
        />
      </div>

      <div class="w-full md:w-1/3">
        <div class="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-125 hover:shadow-2xl">
          <h5 class="text-lg font-bold uppercase tracking-wide mb-4 text-gray-800 font-squid text-center md:text-left">
            Venue Location
          </h5>
          <h6 class="text-base text-pink-700 font-semibold mb-3 font-squid text-center md:text-left">
            21 - 23 February, 2025
          </h6>
          <p class="text-gray-800 leading-relaxed text-center md:text-left">
            Shri Guru Gobind Singhji Institute of Engineering and Technology <br /> Vishnupuri, Nanded 431-606
          </p>
          <div class="flex justify-center md:justify-start mt-3">
            <a
              href="contact.html"
              class="inline-flex items-center text-pink-600 hover:text-pink-800 font-squid"
            >
              <i class="tf-ion-ios-location mr-2"></i>View Map Location
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      </div>
    </>
  );
}

export default Sponsors;
