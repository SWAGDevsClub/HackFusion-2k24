import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import RegistrationForm from "./pages/RegistrationForm";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import RegistrationSuccess from "./pages/Sponsor";
import Sponsor from "./pages/Sponsor";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <BackgroundGradientAnimation>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/sponsors" element={<Sponsor/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BackgroundGradientAnimation>
    </Router>
  );
}

export default App;
