import React from "react";
import "../styles/AdminDashboard.css";

function Sidebar({ setActivePage }) {
  const handleLogout = () => {
    localStorage.clear(); // 🔐 Clear user session
    window.location.href = "/"; // 🔄 Redirect to home or login
  };

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-title">🛠 Admin Panel</h2>
      <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
      <button onClick={() => setActivePage("services")}>Manage Services</button>
      <button onClick={() => setActivePage("bookings")}>Manage Bookings</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Sidebar;
