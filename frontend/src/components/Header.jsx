// Header.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-4 shadow"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        height: "60px",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1050,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold fs-4 d-flex align-items-center">
          <i className="bi bi-person-gear me-2"></i>
          Welcome, Service Owner
        </span>
        <span className="text-light small d-none d-md-block">
          Smart Bike Service Portal | Admin Dashboard
        </span>
      </div>
    </nav>
  );
}

export default Header;
