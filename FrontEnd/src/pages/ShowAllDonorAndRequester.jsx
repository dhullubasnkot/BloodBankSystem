import React, { useState } from "react";
import SidebarLayout from "./sidebarlayout";
import FindBlood from "./findBloodByDonors";
import RequestedBloodList from "./RequestedBloodList";
import Navbar from "../components/navbar";

const FindBloodDashboard = () => {
  const [activeTab, setActiveTab] = useState("donors");

  const renderTab = () => {
    switch (activeTab) {
      case "donors":
        return <FindBlood />;
      case "requests":
        return <RequestedBloodList />;
      default:
        return <FindBlood />;
    }
  };

  return (
    <>
      <div className="flex">
        <SidebarLayout activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-4">{renderTab()}</div>
      </div>
    </>
  );
};

export default FindBloodDashboard;
