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

  // 🔁 Dynamic content based on active page
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
      {/* 📌 Sidebar Navigation */}
      <Sidebar setActivePage={setActivePage} />

      {/* 🧠 Main Section */}
      <div className="admin-main">
        <Header />

        <div className="admin-content">
          {/* 🧾 Dynamic Content */}
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
