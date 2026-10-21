import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
import SplashScreen from "../src/components/SplashScreen"
import ProblemStatement from "./pages/ProblemStatement";
// import Schedule from "./pages/Schedule";
// import RegistrationForm from "./pages/RegistrationForm";
// import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
// import Sponsor from "./pages/Sponsor";
// import Contact from "./pages/Contact";
// import SplashScreen from "./components/SplashScreen";
// import FirebaseStats from "./pages/FirebaseStats";
// // import MaleParticipantsOutsideCampus from "./pages/Male";
// import CountDown from "./pages/CountDown";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Receipt from './pages/Receipt';

import SmoothScroll from "./components/SmoothScroll";




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
        <>
          <SmoothScroll>
            <Suspense fallback={null}>
            <Routes>
              <Route
                path="/"
                element={
                  <Home />
                }
              />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} /> {/* ADDED */}
              <Route path="/faq" element={<Faq />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/problem-statement" element={<ProblemStatement />} />
              {/* <Route path="/registration" element={<RegistrationForm/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/sponsors" element={<Sponsor/>} />
              <Route path="/schedule" element={<Schedule/>} />
              <Route path="/admin" element={<FirebaseStats/>} />
              <Route path="/receipt" element={<Receipt />} />
              <Route path="/CountDown" element={<CountDown/>}/> */}
            </Routes>
            </Suspense>

          </SmoothScroll>
        </>
      }
    </Router>
  );
}

export default App;
