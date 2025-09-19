import { useState, useEffect } from "react";
import CountdownTimer from "../components/CountdownTimer";
import askmeidentity from "/askmeidentity.png";
import github from "/github.png";
import gdgpune from "/gdgpunewhite.png";
import nexus from "/NEXUS.png";
import scce from "/scce.png";
import swoc from "/SWOC.png";
import AOS from "aos";
import "aos/dist/aos.css";
function Home() {
  const [activeTab, setActiveTab] = useState("day1");
  useEffect(() => {
    AOS.init();
  }, []);
  const scheduleData = {
    day1: [
      {
        time: "6.00 pm",
        title: "Opening Ceremony\nIntroduction & problem statement briefing",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "8:00 pm",
        title: "Dinner Break",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "9.00 pm",
        title: "Hackathon Begins",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "10.00 pm",
        title: "First Invigilation",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "12.00 am",
        title: "Coffee/Tea Break",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
    ],
    day2: [
      {
        time: "8.00am",
        title: "Breakfast & Coffee",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "9.00 am",
        title:
          '1st Evaluation", "Respective seats", "End of First Invigilation',
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "12.00 pm",
        title: "Lunch Break",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "4.00 pm",
        title: "Game for all participants",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "5.00 pm",
        title: "2nd Evaluation",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "8.00 pm",
        title: 'Dinner Break", "End of Secod Invigilation',
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "12.00 am",
        title: "Coffee/Tea Break",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
    ],
    day3: [
      {
        time: "8.00 am",
        title: "Breakfast & Coffee/Tea",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "9.00 am",
        title: "Hackathon Ends",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "11.00 am",
        title: "Final evaluation (presentation to judges)",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
      {
        time: "4.00 pm",
        title: "Award ceremony!!!",
        speaker: "",
        role: "",
        image: "/api/placeholder/80/80",
      },
    ],
  };

  const tabs = [
    { id: "day1", label: "Day 1", date: "21 Feb, 2025" },
    { id: "day2", label: "Day 2", date: "22 Feb, 2025" },
    { id: "day3", label: "Day 3", date: "23 Feb, 2025" },
  ];

  return (
    <>
      <div className="absolute z-30 inset-0 pb-6 overflow-y-scroll hide">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/hero-img.png')",
            backgroundSize: "45%",
            backgroundPosition: "48% center",
            backgroundRepeat: "no-repeat",
            opacity: "0.15",
          }}
        />

        <div
          className="absolute"
          style={{
            top: "95%", // Adjust the vertical position
            left: "50%", // Adjust the horizontal position
            transform: "translate(-50%, -50%)", // Center the mouse image
            animation: "floatscroll 3s ease-in-out infinite", // Add floating animation
          }}
        >
          <img
            src="/scroll.png" // Replace with the actual path to your mouse PNG
            alt="Floating Mouse"
            className="w-16 h-16" // Adjust size as needed
          />
        </div>

        {/* Add floating animation styles */}
        <style>
          {`
              @keyframes floatscroll {
                0%, 100% {
                  transform: translate(-50%, -50%) translateY(0);
                }
                50% {
                  transform: translate(-50%, -50%) translateY(-20px); /* Float upward */
                }
              }
            `}
        </style>

        {/* Main Banner Section */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white font-bold px-4 w-full min-h-screen sm:mb-20">
          {/* Floating Images */}
          <img
            src="/hero-element1.webp"
            alt="hero 1"
            className="h-28 mt-10 lg:h-60 lg:block lg:ms-4 md:hidden sm:hidden max-sm:hidden sm:h-30 md:h-40 absolute top-10 left-8 md:left-36 md:top-20"
            data-aos="fade-down-right"
          />
          <img
            src="/hero-element2.png"
            alt="hero 2"
            className="h-40 lg:ms-36 md:ms-30  sm:h-50 md:h-60 absolute bottom-10 left-4 md:left-16"
            data-aos="fade-up-right"
          />

          {/* Main Content */}
          <div className="p-4 text-center max-w-3xl w-full mx-4 sm:mx-8 max-sm:mb-20">
            {/* Logo */}
            <div className="flex items-center justify-center mb-4">
              <img
                src="/logon.png"
                className="h-20 w-auto sm:h-12 md:h-auto md:w-[600px]"
                alt="Logo"
                data-aos="flip-right"
              />
            </div>

            {/* Subtitle */}
            <p className="text-lg italic mb-6 font-squid" data-aos="fade-right">
              &quot;Code, Compete, Survive&quot;
            </p>

            {/* Registration Button */}
            <div className="flex flex-col items-center gap-4 justify-center">
              <button
                className="bg-red-500 py-2  px-6 rounded-full shadow-lg hover:bg-red-600 transition duration-300 font-squid cursor-pointer tracking-wide"
                data-aos="fade-right"
              >
                Registrations Closed
              </button>

              <a
                className="outline-none"
                href="https://docs.google.com/document/d/1KsOGCSk-buQ7ewl6Z1viC847XhHBDl3HmceKTGFhMxU/edit?usp=sharing"
                target="_blank"
              >
                <button
                  className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-squid cursor-pointer tracking-wide"
                  data-aos="fade-right"
                >
                  View Problem Statement
                </button>
              </a>
              <a
                className="outline-none"
                href="https://docs.google.com/document/d/1gOltYvRzzqnFfO9jaJuGtuucVhDzi4f3dwBBWwF7PpI/edit?usp=sharing"
                target="_blank"
              >
                <button
                  className="bg-green-500 py-2 px-6 rounded-full shadow-lg hover:bg-green-600 transition duration-300 font-squid cursor-pointer tracking-wide"
                  data-aos="fade-right"
                >
                  Code of Conduct
                </button>
              </a>
            </div>
            {/* <button
              className="bg-pink-500 py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300 font-squid cursor-pointer"
              data-aos="fade-right"
              onClick={(event) => {
                event.preventDefault(); // Prevents default behavior, if needed
                alert("Registration is temporarily unavailable due to maintenance. Please try after 3AM 18 Jan 2025.");
              }}
            >
              Register Now
            </button> */}

            {/* Countdown Timer */}
            <CountdownTimer targetDate="2026-02-19T00:00:00" />

            {/* Logos Section */}
            <div className="flex items-center justify-center gap-4 pt-8 flex-wrap">
              <img
                src="/swag_white.png"
                alt="Swag Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 "
                data-aos="zoom-in-up"
              />
              <img
                src="/GDG_White_logo.png"
                alt="GDG Logo"
                className="h-16 sm:h-20 w-auto"
                data-aos="zoom-in-up"
              />
            </div>
          </div>

          {/* Right-Side Floating Image */}
          <img
            src="/hero-element3.png"
            alt="Guard"
            className="h-40 lg:me-32 md:me-30  sm:h-50 md:h-60 absolute bottom-10 right-4 md:right-16"
            data-aos="fade-up-left"
          />
        </div>
        <section className="text-white body-font mt-10">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded h-720 w-600"
                alt="hero"
                src="/hero.png"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white font-squid drop-shadow-[0_0_10px_#ffd700]">
                A Fusion of Ideas, Code,
                <br className="hidden lg:inline-block font-squid" />
                and Excitement!
              </h1>
              <p className="mb-8 leading-relaxed font-outfit tracking-wide lg:w-2/3 md:text-sm lg:text-lg">
                Join us for a thriling Natinal Level Hackathon - HACKFUSION 2.0
                ! Immerse yourselves in the vibrant atmosphere of the SGGSIEST
                as you compete alongside 100+ teams. This isn&apos;t just about
                coding; it&apos;s a fusion of ideas, code, and excitement.
                Hackfusion 2.0 offers an incredible opportunity to connect with
                like-minded developers, mentors, and sponsors!
              </p>
              <div className="flex justify-center">
                <a href="/rulebook2025.pdf" target="_blank">
                  <button className="font-squid inline-flex text-[#2a75bb] bg-yellow-500  py-2 px-6 focus:outline-none hover:yellow-400 rounded text-lg border-0 hover:shadow-[0_0_20px_5px] hover:shadow-yellow-400">
                    Rule Book
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="text-white body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white font-squid drop-shadow-[0_0_10px_#ffd700]">
                ₹2,00,000 Prize Pool!
                <br className="hidden lg:inline-block font-squid" />
              </h1>
              <p className="mb-4 leading-relaxed font-outfit tracking-wide lg:w-2/3 md:text-sm lg:text-lg">
                Prepare to be captivated by a ₹2,00,000 prize pool! This
                isn&apos;t just about the competition; it&apos;s about the
                journey. Embrace the challenge, collaborate with your team, and
                let your creativity soar. Hackfusion 2.0 promises an
                unforgettable experience filled with fun, engagement, and the
                thrill of innovation. So, are you ready to code your way to
                success? Join us for Hackfusion 2.0 and let the coding begin!
              </p>

              {/* <div className="flex justify-center">
                <button className="font-squid inline-flex text-[#2a75bb] bg-yellow-500  py-2 px-6 focus:outline-none hover:yellow-400 rounded text-lg border-0 hover:shadow-[0_0_20px_5px] hover:shadow-yellow-400">
                  Watch here
                </button>
              </div> */}
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded h-720 w-auto"
                alt="hero"
                src="/hero-img2.png"
              />
            </div>
          </div>
        </section>
        <section className="text-white body-font mt-10">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center lg:ml-4 rounded h-[500px] sm:h-[400px] max-sm:h[300px] w-auto"
                alt="hero"
                src="/hero-img3.png"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white font-squid drop-shadow-[0_0_10px_#ffd700]">
                Having Any Questions ?
              </h1>
              <p className="mb-8 leading-relaxed font-outfit tracking-wide lg:w-2/3 md:text-sm lg:text-lg">
                Confused about how the hackathon works? Check out our FAQs for
                quick answers to common questions about registration,
                participation, and submissions. Still unsure? Contact us for
                more clarity!
                <br />( Please keep checking out this page for updated FAQs! )
              </p>
              <div className="flex justify-center">
                <a href="/FAQs.pdf" target="_blank">
                  <button className="font-squid inline-flex text-[#2a75bb] bg-yellow-500  py-2 px-6 focus:outline-none hover:yellow-400 rounded text-lg border-0 hover:shadow-[0_0_20px_5px] hover:shadow-yellow-400">
                    FAQs
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="text-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {/* Card 1 */}
              <div className="lg:p-4 lg:mx-0 sm:p-2 max-sm:p-6 md:mx-16 lg:w-1/3 ">
                <div className="bg-gray-800/70 rounded-xl p-6 mb-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3  font-squid">
                    ₹2,00,000 Prize Pool
                  </h1>
                  <p className="leading-relaxed mb-3 font-outfit tracking-wide max-sm:text-sm ">
                    Exciting awards and gifts for the best solutions of problem
                    statement!! Don&apos;t miss this chance to showcase your
                    talents and be recognized for the best solutions.
                    <br></br>
                    <br></br>
                    <br></br>
                  </p>
                </div>
              </div>
              {/* Card 2 */}
              <div className="lg:p-4 lg:mx-0 sm:p-2 max-sm:p-6 md:mx-16 lg:w-1/3 ">
                <div className="bg-gray-800/70 rounded-xl p-6 mb-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3  font-squid">
                    Great Community
                  </h1>
                  <p className="leading-relaxed mb-3 font-outfit tracking-wide max-sm:text-sm">
                    Embark on a journey of collaboration and knowledge exchange
                    as you seize networking opportunities with fellow
                    enthusiasts and industry experts. Don&apos;t just win an
                    award, create lasting connections that propel your success
                    to new heights!
                  </p>
                </div>
              </div>
              {/* Card 3 */}
              <div className="lg:p-4 lg:mx-0 sm:p-2 max-sm:p-6 md:mx-16 lg:w-1/3 ">
                <div className="bg-gray-800/70 rounded-xl p-6 mb-6 border border-gray-700 shadow-lg border-yellow-500 border-4">
                  <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3  font-squid">
                    36+ Hours
                  </h1>
                  <p className="leading-relaxed mb-3 font-outfit tracking-wide max-sm:text-sm">
                    Immerse yourself in two days of intense brainstorming and
                    coding sessions, where innovation takes center stage. Engage
                    in dynamic discussions, exchange ideas with top-notch
                    professionals, and harness the power of collaborative
                    problem-solving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-center items-center gap-6 lg:flex-row md:flex-col">
          {/* Floating Images */}

          <div className="flex flex-wrap md:flex-row">
            <div
              className=" top-10 left-10 z-10"
              style={{ animation: "float2 4s ease-in-out infinite" }}
            >
              <img
                src="/hero-img.png"
                alt="Floating 1"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div
              className=" top-20 right-10 z-10"
              style={{ animation: "float 5s ease-in-out infinite" }}
            >
              <img
                src="/hero-img.png"
                alt="Floating 2"
                style={{ width: "96px", height: "96px" }}
              />
            </div>
            <div
              className=" bottom-10 left-20 z-10"
              style={{ animation: "float2 6s ease-in-out infinite" }}
            >
              <img
                src="/hero-img.png"
                alt="Floating 3"
                style={{ width: "64px", height: "64px" }}
              />
            </div>
          </div>
          {/* Inline Keyframes */}
          <style>
            {`
              @keyframes float2 {
                0% {
                  transform: translate(0, 0);
                }
                25% {
                  transform: translate(30px, -30px);
                }
                50% {
                  transform: translate(0, -40px);
                }
                75% {
                  transform: translate(-20px, -30px);
                }
                100% {
                  transform: translate(-10, -20);
                }
              }
           `}
          </style>

          {/* Package 1 */}
          <div className="w-full md:w-1/2 lg:w-1/3  max-sm:p-6 m-5">
            <div className="shadow-lg rounded-lg p-6 bg-gradient-to-t from-yellow-700 via-yellow-600 to-yellow-500 hover:shadow-[0_0_30px_10px_rgba(255,255,0,0.5)]">
              {/* Price Header */}
              <div className="flex flex-col items-center mb-4 ">
                <div className="text-pink-500 text-5xl ">
                  <img src="/pep.png" alt="" className="h-20" />
                </div>
                <h2 className="text-4xl font-bold text-white mt-4 font-squid">
                  ₹1000/-
                </h2>
                <p className="text-xs mt-2 font-squid font-bold tracking-wider">
                  ( Non-Refundable )
                </p>
              </div>
              {/* Package Name */}
              <h6 className="text-center text-lg font-semibold text-white mb-4 border-2 rounded-lg font-squid">
                Benefits
              </h6>
              {/* List */}
              <ul className="list-none text-white text-sm space-y-2 text-center font-outfit tracking-wide ">
                <li>₹2,00,000 Prize pool</li>
                <li>Certificate of participation </li>
                <li>Free Accommodation</li>
                <li>Skill Development </li>
                <li>Networking Opportunities </li>
                <li>Portfolio Enhancement </li>
                <li>Career Advancement </li>
                <li>Personal Growth</li>
                <li>Internship Oppurtunity</li>
              </ul>
              {/* Button */}
              <div className="text-center mt-6">
                {/* <Link
                  to="/registration"
                  className="font-squid bg-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
                >
                  Register Now
                </Link> */}

                {/* ///////////////////////////////////////////////// */}

                {/* <Link
                  to="/registration"
                  className="font-squid bg-pink-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-700 transition duration-300"
                  onClick={(event) => {
                    event.preventDefault(); // Prevents navigation to the /registration route
                    alert("Registration is temporarily unavailable due to maintenance. Please try after 3AM 18 Jan 2025.");
                  }}
                >
                  Register Now
                </Link> */}
              </div>
            </div>
          </div>

          {/* Floating Images */}
          <div className="flex flex-wrap md:flex-row mt-4">
            <div
              className=" top-10 left-10 z-10"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <img
                src="/hero-img.png"
                alt="Floating 1"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <div
              className=" top-20 right-10 z-10"
              style={{ animation: "float2 5s ease-in-out infinite" }}
            >
              <img
                src="/hero-img.png"
                alt="Floating 2"
                style={{ width: "96px", height: "96px" }}
              />
            </div>
            <div
              className=" bottom-10 left-20 z-10"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <img
                src="/hero-img.png"
                alt="Floating 3"
                style={{ width: "64px", height: "64px" }}
              />
            </div>
          </div>

          {/* Inline Keyframes */}
          <style>
            {`
              @keyframes float {
                0% {
                  transform: translate(0, 0);
                }
                25% {
                  transform: translate(30px, -30px);
                }
                80% {
                  transform: translate(0, -40px);
                }
                75% {
                  transform: translate(-10px, -30px);
                }
                100% {
                  transform: translate(-10, -20);
                }
              }
           `}
          </style>
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className=" container lg:mx-auto mt-32 md:p-16  max-sm:p-6 ">
            <div className="flex flex-col ">
              <nav
                className="flex justify-center space-x-4 mb-8 tracking-wide font-outfit"
                role="tablist"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-1/3 text-center px-6 py-4 font-bold rounded-md shadow-md transition duration-300 ${
                      activeTab === tab.id
                        ? "bg-yellow-500 text-[#2a75bb]"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                <ul className="space-y-4 font-outfit tracking-wide ">
                  {scheduleData[activeTab].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center gap-10 bg-gray-100 p-4 rounded-lg shadow-lg"
                    >
                      <h4 className="text-[#2a75bb] font-bold">{item.time}</h4>
                      <div className="flex-1 px-4 items-center justify-center">
                        <h3 className="text-lg font-bold mb-2 max-sm:text-sm">
                          {item.title}
                        </h3>
                        {/* {item.speaker && (
                        <>
                          <span className="text-sm font-semibold">By {item.speaker}</span>
                          <p className="text-sm text-gray-600">{item.role}</p>
                        </>
                      )} */}
                        {/* {item.description && (
                        <p className="text-sm text-gray-600">{item.description}</p>
                      )} */}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="text-white body-font">
          <div className="container px-5 py-24 mx-auto">
            <h1 className="text-4xl font-bold title-font mb-4 text-center  md:ml-6 font-squid transition-all ease-in-out drop-shadow-[0_0_10px_#ffd700]">
              Winners
            </h1>
            <p className="text-2xl text-white mb-8 text-center md:ml-6 font-squid">
              Previous Year
            </p>
            <div className="flex flex-wrap justify-center md:ml-10">
              {/* Card 1 */}
              <div className="lg:p-4 lg:mx-0 sm:p-2 max-sm:p-2 md:mx-16 lg:w-1/3">
                <div className=" rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_10px_rgba(255,203,5,0.5)] font-outfit tracking-wide">
                  <img
                    className="object-fill object-center rounded h-64 sm:h-72 md:h-80 lg:h-80 w-full"
                    src="/first.jpeg"
                    alt="blog"
                  />
                  <div className="p-6 bg-gray-800/80">
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
              <div className="lg:p-4 lg:mx-0 sm:p-2 max-sm:p-2 md:mx-16 lg:w-1/3">
                <div className=" rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105  hover:shadow-[0_0_30px_10px_rgba(0,150,255,0.5)] font-outfit tracking-wide">
                  <img
                    className="object-fill object-center rounded h-64 sm:h-72 md:h-80 lg:h-80 w-full"
                    src="/second.jpeg"
                    alt="blog"
                  />
                  <div className="p-6 bg-gray-800/80">
                    <h2 className="tracking-widest text-lg title-font font-medium text-white mb-1">
                      Team Loosers
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                      1st Runner Up
                    </h1>
                    <p className="leading-relaxed mb-3">
                      Remarkable performance by Team Loosers!
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className="lg:p-4 lg:mx-0 sm:p-2 max-sm:p-2 md:mx-16 lg:w-1/3 ">
                <div className=" rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_10px_rgba(0,255,150,0.5)] font-outfit tracking-wide">
                  <img
                    className="object-fill object-center rounded h-64 sm:h-72 md:h-80 lg:h-80 w-full"
                    src="/third.jpeg"
                    alt="blog"
                  />
                  <div className="p-6 bg-gray-800/80">
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

        <section className="text-gray-600 body-font" id="sponsor">
          <h1 className="text-4xl font-bold title-font mb-10 text-center text-white font-squid transition-all ease-in-out drop-shadow-[0_0_10px_#ffd700]">
            Sponsers
          </h1>
          <div className="container px-4 py-24 mx-auto mb-0 max-sm:p-7">
            <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">
              Title Sponser
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/1 md:w-1/1 p-4 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className=" object-fill object-center w-auto h-full block"
                    src={askmeidentity}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font">
          {/* Second Section without vertical gap */}
          <div className="container px-4 mx-auto mb-20 max-sm:p-7">
            <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">
              Diamond Sponsor
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={github}
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font">
          {/* Second Section without vertical gap */}
          <div className="container px-4 mx-auto mb-20 max-sm:p-7">
            <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">
              Hiring Partner
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src="/riskgaurd.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="text-gray-600 body-font">

      
          <div className="container px-4 mx-auto mb-20 max-sm:p-7">
            <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid">Platform Partner</h1>
            <div className="flex flex-wrap -m-4">


              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                </a>

              </div>
            </div>
          </div>
        </section> */}

        <section className="text-gray-600 body-font">
          {/* Second Section without vertical gap */}
          <div className="container px-4 mx-auto mb-20 max-sm:p-7">
            <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid ">
              Community Partners
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src={gdgpune}
                  />
                </a>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={nexus}
                  />
                </a>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={scce}
                  />
                </a>
              </div>
              <div className="lg:w-1/4 md:w-1/2 p-4 w-full mb-2">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block"
                    src={swoc}
                  />
                </a>
              </div>

              <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <a className="block relative h-50 rounded overflow-hidden ">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/Black.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font">
          <div className="container px-4 mx-auto mb-20 max-sm:p-7">
            <h1 className="lg:text-xl max-sm:text-base font-bold title-font mb-2 text-white font-squid  ">
              GDG on Campus Community Partners
            </h1>
            <div className="flex flex-wrap -m-4">
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/KBJ.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/Xavier.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/SIES.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/Atharva.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/icfai.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/MIT.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/MGMCO.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/nbnscoe.png"
                  />
                </a>
              </div>
              <div className="lg:w-1/3 md:w-1/2 p-10 w-full">
                <a className="block relative h-50 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center mt-16 w-full h-full block"
                    src="/SVECW.png"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-2 py-12 z-40">
          <div className="container mx-auto px-4 pb-10">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-auto flex justify-center z-40">
                <img
                  src="/footer-img.png"
                  alt="Rotating Image"
                  className="shadow-lg h-40 w-40 sm:h-50 sm:w-50 md:h-1/3 md:w-1/3 rounded-full transform transition-transform duration-700 ease-in-out hover:rotate-[360deg] hover:scale-50 hover:shadow-2xl"
                />
              </div>

              <div className="w-full md:w-1/3 max-sm:p-4">
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-125 hover:shadow-2xl">
                  <h5 className="text-lg font-bold uppercase tracking-wide mb-4 text-gray-800 font-squid text-center md:text-left">
                    Venue Location
                  </h5>
                  <h6 className="text-base text-pink-700 font-semibold mb-3 font-squid text-center md:text-left">
                    21 - 23 February, 2025
                  </h6>
                  <p className="text-gray-800 leading-relaxed text-center md:text-left">
                    Shri Guru Gobind Singhji Institute of Engineering and
                    Technology <br /> Vishnupuri, Nanded 431-606
                  </p>
                  <div className="flex justify-center md:justify-start mt-3">
                    <a
                      href="https://maps.app.goo.gl/3X19we4e53V3j4a89"
                      target="_blank"
                      className="inline-flex items-center text-pink-600 hover:text-pink-800 font-squid"
                    >
                      <i className="tf-ion-ios-location mr-2"></i>View Map
                      Location
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="  z-20 inset-0 py-6 bg-transparent flex justify-center items-end text-center text-white">
            <p className="text-sm font-squid">
              © 2026 HackFusion. All Rights Reserved.
            </p>
          </footer>
        </section>
      </div>
    </>
  );
}

export default Home;
