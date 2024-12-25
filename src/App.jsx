import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sponsors from "./pages/Sponsors";
import PrizePool from "./pages/PrizePool";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sponsors" element={<Sponsors />} />
          
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
