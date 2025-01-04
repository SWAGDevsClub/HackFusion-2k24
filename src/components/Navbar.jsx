import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="absolute z-50 inset-0 text-white py-4 w-full h-fit">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}

        {/* Navigation Links for Larger Screens */}
        <ul className="hidden sm:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-pink-400 cursor-pointer transition font-squid">Home</Link>
          </li>
          <li>
            <Link to="/sponsors" className="hover:text-pink-400 cursor-pointer transition font-squid">Sponsors</Link>
          </li>
          <li>
            <Link to="/schedule" className="hover:text-pink-400 cursor-pointer transition font-squid">Schedule</Link>
          </li>
        </ul>

        {/* Hamburger Menu for Smaller Screens */}
        <div className="sm:hidden">
          <button
            id="menu-button"
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              // Close Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {menuOpen && (
        <div className="flex flex-col space-y-2 text-center bg-black/75 p-4 absolute top-16 left-0 w-full sm:hidden">
          <Link
            to="/"
            className="hover:text-pink-400 font-squid cursor-pointer transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/sponsors"
            className="hover:text-pink-400 font-squid cursor-pointer transition"
            onClick={() => setMenuOpen(false)}
          >
            Sponsors
          </Link>
          <Link
            to="/schedule"
            className="hover:text-pink-400 font-squid cursor-pointer transition"
            onClick={() => setMenuOpen(false)}
          >
            Schedule
          </Link>
        </div>

      )}
    </div>
  );
}

export default Navbar;