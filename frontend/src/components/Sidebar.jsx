// src/components/Sidebar.jsx

import React from "react";
import "../styles/AdminDashboard.css";

function Sidebar({ setActivePage }) {
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">🛠 Admin Panel</h2>
      <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
      <button onClick={() => setActivePage("services")}>Manage Services</button>
      <button onClick={() => setActivePage("bookings")}>Manage Bookings</button>
      <button onClick={() => window.location.href = "/login"}>Logout</button>
    </div>
  );
}

export default Sidebar;
