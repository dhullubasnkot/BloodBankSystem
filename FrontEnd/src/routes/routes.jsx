import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindBlood from "../pages/findBlood";
import HeroSection from "../pages/hero";
import OurCollobaration from "../pages/OurCollabration";
import OurMission from "../pages/ourMission";
import Navbar from "../components/navbar";
import Register from "../auth/signup";

const AppRoutes = () => (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/ourmission" element={<OurMission />} />
        <Route path="/collaboration" element={<OurCollobaration />} />
        <Route path="/findblood" element={<FindBlood />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  </>
);

export default AppRoutes;
