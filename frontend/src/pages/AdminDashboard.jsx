// src/pages/AdminDashboard.jsx

import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import ManageServices from "../components/ManageServices";
import ManageBookings from "../components/ManageBookings";

import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "services":
        return <ManageServices />;
      case "bookings":
        return <ManageBookings />;
      default:
        return <h2>🚧 Coming Soon</h2>;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* 🔔 Top Marquee Bar */}
      <div className="admin-marquee">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          🚀 Welcome Admin! | 🛠️ Manage Services | 📅 Track Bookings | 🎯 Monitor Dashboard | 📢 New Features Coming Soon!
        </marquee>
      </div>

      {/* 📌 Sidebar + Content */}
      <Sidebar setActivePage={setActivePage} />

      <div className="admin-main">
        <Header />
        
        <div className="admin-content">{renderPage()}</div>
      </div>



  

    </div>
  );
}

export default AdminDashboard;
