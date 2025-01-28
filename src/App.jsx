import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import RegistrationForm from "./pages/RegistrationForm";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import Sponsor from "./pages/Sponsor";
import Contact from "./pages/Contact";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [splashScreen, setSplashScreen] = useState(true);
  const handleSplashEnd = () => {
    setSplashScreen(false);
  };
  return (
    <Router>
      {splashScreen ?
        <SplashScreen onEnd={handleSplashEnd} />
        :
        <BackgroundGradientAnimation>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/sponsors" element={<Sponsor />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BackgroundGradientAnimation>
      }


    </Router>
  );
}

export default App;
