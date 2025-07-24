import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar({ setActivePage }) {
  const handleLogout = () => {
    localStorage.clear(); // 🔐 Clear session
    window.location.href = "/"; // 🔄 Redirect to login or homepage
  };

  return (
    <div className="bg-dark text-white p-4 h-100" style={{ minHeight: "100vh", width: "250px" }}>
      <h2 className="text-center mb-4">🛠 Admin Panel</h2>

      <div className="d-grid gap-2">
        <button
          className="btn btn-outline-light"
          onClick={() => setActivePage("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => setActivePage("services")}
        >
          🛠 Manage Services
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => setActivePage("bookings")}
        >
          📋 Manage Bookings
        </button>
        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          🔓 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
