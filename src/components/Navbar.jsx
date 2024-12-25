import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
  <div className="bg-repeat bg-center text-white py-4 navbar" >
      <div className="container mx-auto flex justify-between items-center">
        <img src="logonew.png" className="h-10 w-auto" alt="" />
        {/* <h1 className="text-2xl font-bold" style={{ fontFamily: 'GameOfSquids, sans-serif' }}>HackFusion 2.0</h1> */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-pink-400  font-squid" >Home</Link>
          </li>
          <li>
            <Link to="/sponsors" className="hover:text-pink-400 font-squid" >Sponsors</Link>
          </li>
          {/* <li>
            <Link to="/prize-pool" className="hover:text-yellow-400">Prize Pool</Link>
          </li> */}
          <li>
            <Link to="/schedule" className="hover:text-pink-400 font-squid" >Schedule</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
