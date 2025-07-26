import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ManageServices from "../components/ManageServices";
import ManageBookings from "../components/ManageBookings";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [totalServices, setTotalServices] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [readyBookings, setReadyBookings] = useState(0);

  useEffect(() => {
    if (activePage === "dashboard") {
      fetchStats();
    }
  }, [activePage]);

  const fetchStats = async () => {
    try {
      const servicesRes = await axios.get("/services");
      setTotalServices(servicesRes.data.length);

      const bookingsRes = await axios.get("/bookings");
      const bookings = bookingsRes.data;

      setPendingBookings(bookings.filter((b) => b.status === "PENDING").length);
      setReadyBookings(bookings.filter((b) => b.status === "READY").length);
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {/* Header */}
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

      {/* Sidebar */}
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

      {/* Main Content */}
      <div
        className="container-fluid px-4"
        style={{
          marginLeft: "250px",
          paddingTop: "80px",
          minHeight: "100vh",
          overflowX: "hidden",
          backgroundColor: "#f8f9fa",
        }}
      >
        <style>
          {`
            .card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              background-color: #ffffff;
              border: 1px solid #dee2e6;
            }
            .card:hover {
              transform: scale(1.03);
              box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }
            .stat-icon {
              font-size: 2rem;
            }
          `}
        </style>

        {activePage === "dashboard" && (
          <div className="row g-4 mt-2">
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card text-dark text-center p-3">
                <i className="bi bi-tools text-primary stat-icon mb-2"></i>
                <h5 className="text-primary mb-1">{totalServices}</h5>
                <p className="text-muted small mb-0">Total Services</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card text-dark text-center p-3">
                <i className="bi bi-hourglass-split text-warning stat-icon mb-2"></i>
                <h5 className="text-warning mb-1">{pendingBookings}</h5>
                <p className="text-muted small mb-0">Pending Bookings</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card text-dark text-center p-3">
                <i className="bi bi-check-circle text-success stat-icon mb-2"></i>
                <h5 className="text-success mb-1">{readyBookings}</h5>
                <p className="text-muted small mb-0">Ready for Delivery</p>
              </div>
            </div>
          </div>
        )}

        {activePage === "services" && (
          <div className="mt-4">
            <ManageServices />
          </div>
        )}

        {activePage === "bookings" && (
          <div className="text-center text-muted fs-5 mt-5">
            <ManageBookings />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
