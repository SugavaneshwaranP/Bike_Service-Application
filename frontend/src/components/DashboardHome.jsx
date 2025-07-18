// src/components/DashboardHome.jsx

import React from "react";
import "../styles/AdminDashboard.css";

function DashboardHome() {
  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>
      <div className="stat-boxes">
        <div className="stat-box">
          <h3>5</h3>
          <p>Total Services</p>
        </div>
        <div className="stat-box">
          <h3>8</h3>
          <p>Pending Bookings</p>
        </div>
        <div className="stat-box">
          <h3>3</h3>
          <p>Ready for Delivery</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
