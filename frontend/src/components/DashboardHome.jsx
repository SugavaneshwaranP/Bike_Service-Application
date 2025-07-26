// DashboardHome.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function DashboardHome() {
  const [totalServices, setTotalServices] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [readyBookings, setReadyBookings] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

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

  return (
    <div
      className="container-fluid px-4 py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('/assets/admin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        marginLeft: "250px",
        paddingTop: "80px", // space below fixed header
        minHeight: "100vh",
      }}
    >
      <style>
        {`
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            backdrop-filter: blur(5px);
            background-color: rgba(255, 255, 255, 0.9);
            border: none;
          }
          .card:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          }
          .stat-icon {
            font-size: 2.5rem;
          }
        `}
      </style>

      <div className="text-center mb-5">
        <img
          src="/assets/bike.jpg"
          alt="Logo"
          className="rounded-circle mb-3"
          style={{
            width: "100px",
            height: "100px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        />
        <h2 className="fw-bold text-dark">📊 Dashboard Overview</h2>
        <p className="text-muted">
          Monitor your bike service operations at a glance
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 text-dark text-center p-4">
            <i className="bi bi-tools stat-icon text-primary mb-3"></i>
            <h3 className="text-primary">{totalServices}</h3>
            <p className="text-muted">Total Services</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 text-dark text-center p-4">
            <i className="bi bi-hourglass-split stat-icon text-warning mb-3"></i>
            <h3 className="text-warning">{pendingBookings}</h3>
            <p className="text-muted">Pending Bookings</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 text-dark text-center p-4">
            <i className="bi bi-check-circle stat-icon text-success mb-3"></i>
            <h3 className="text-success">{readyBookings}</h3>
            <p className="text-muted">Ready for Delivery</p>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-4">
        <div className="col-12">
          <div className="card text-dark">
            <div className="card-body text-center">
              <h4 className="card-title text-primary mb-3">Quick Actions</h4>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button className="btn btn-outline-primary rounded-pill px-4">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Service
                </button>
                <button className="btn btn-outline-success rounded-pill px-4">
                  <i className="bi bi-list-check me-2"></i>
                  View All Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
