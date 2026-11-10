import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("../src/pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
import ProblemStatement from "./pages/ProblemStatement";
import SplashGate from "./components/SplashGate";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";

import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // The splash is handled entirely by <SplashGate>: it shows the loading screen,
  // then renders everything inside it. No extra splash state is needed here.
  return (
    <SplashGate>
      <Router>
        <SmoothScroll>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/problem-statement" element={<ProblemStatement />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<Login initialFlipped={true} />} />
            </Routes>
          </Suspense>
        </SmoothScroll>
      </Router>
    </SplashGate>
  );
}

export default App;
