// src/pages/AdminDashboard.jsx

import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Render dynamic content
  const renderPage = () => {
    if (activePage === "dashboard") return <DashboardHome />;
    if (activePage === "services") return <h2>Manage Services (Coming Soon)</h2>;
    if (activePage === "bookings") return <h2>Manage Bookings (Coming Soon)</h2>;
  };

  return (
    <div className="admin-dashboard">
      <Sidebar setActivePage={setActivePage} />
      <div className="admin-main">
        <Header />
        <div className="admin-content">{renderPage()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;
