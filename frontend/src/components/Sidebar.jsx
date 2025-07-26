// Sidebar.jsx
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Sidebar({ setActivePage }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      className="d-flex flex-column justify-content-between p-4 shadow"
      style={{
        width: "250px",
        position: "fixed",
        top: "60px",
        left: 0,
        height: "calc(100vh - 60px)",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        zIndex: 1040,
        borderRight: "1px solid #dee2e6",
      }}
    >
      <div>
        <h4 className="fw-bold text-primary mb-4">
          <i className="bi bi-wrench-adjustable-circle me-2"></i>
          Admin Panel
        </h4>

        <div className="d-grid gap-3">
          <button
            className="btn btn-outline-primary text-start d-flex align-items-center"
            onClick={() => setActivePage("dashboard")}
          >
            <i className="bi bi-bar-chart me-2"></i>
            Dashboard
          </button>

          <button
            className="btn btn-outline-primary text-start d-flex align-items-center"
            onClick={() => setActivePage("services")}
          >
            <i className="bi bi-hammer me-2"></i>
            Manage Services
          </button>

          <button
            className="btn btn-outline-primary text-start d-flex align-items-center"
            onClick={() => setActivePage("bookings")}
          >
            <i className="bi bi-calendar-check me-2"></i>
            Manage Bookings
          </button>
        </div>
      </div>

      <button
        className="btn btn-outline-danger d-flex align-items-center w-100"
        onClick={handleLogout}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
