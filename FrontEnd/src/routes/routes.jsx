import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FindBlood from "../pages/findBlood";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="findblood" element={<FindBlood />} />
    </Routes>
  </Router>
);

export default AppRoutes;
