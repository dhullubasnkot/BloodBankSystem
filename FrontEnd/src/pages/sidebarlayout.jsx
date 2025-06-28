import React from "react";

const SidebarLayout = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 min-h-screen bg-red-600 text-white p-6 space-y-4">
      {/* <h2 className="text-2xl font-bold mb-6 text-center ">🩸</h2> */}

      <button
        onClick={() => setActiveTab("donors")}
        className={`block w-full text-left px-4 py-2 rounded transition ${
          activeTab === "donors"
            ? "bg-white text-red-600 font-semibold"
            : "hover:bg-red-500"
        }`}
      >
        All Donors
      </button>

      <button
        onClick={() => setActiveTab("requests")}
        className={`block w-full text-left px-4 py-2 rounded transition ${
          activeTab === "requests"
            ? "bg-white text-red-600 font-semibold"
            : "hover:bg-red-500"
        }`}
      >
        Blood Requests
      </button>

      <button
        onClick={() => alert("This feature is coming soon!")}
        className="block w-full text-left px-4 py-2 rounded hover:bg-red-500"
      >
        My Bookings (soon)
      </button>
    </aside>
  );
};

export default SidebarLayout;

//SideBarLayout
