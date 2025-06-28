import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindBlood from "../pages/findBloodByDonors";
import HeroSection from "../pages/hero";
import OurCollobaration from "../pages/OurCollabration";
import OurMission from "../pages/ourMission";
import Navbar from "../components/navbar";
import Register from "../auth/signup";
import RegisterAsDonor from "../pages/RegisterAsDonor";
import RequestBloodForm from "../pages/RequestBlood";
import FindBloodDashboard from "../pages/ShowAllDonorAndRequester";

const AppRoutes = () => (
  <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />

        <Route path="/DonorandRequetedBlood" element={<FindBloodDashboard />} />
        <Route path="/findblood" element={<FindBlood />} />
        <Route path="/BeaDonor" element={<RegisterAsDonor />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RequestBlood" element={<RequestBloodForm />} />
      </Routes>
    </Router>
  </>
);

export default AppRoutes;
//Routes
