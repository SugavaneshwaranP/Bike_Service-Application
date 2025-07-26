// Importing React and hooks for component logic
import React, { useEffect, useState } from "react";
// Importing custom axios instance for API calls
import axios from "../api/axios";
// Importing Bootstrap styles and icons for UI
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Main dashboard component to show service & booking stats
function DashboardHome() {
  // State to hold total number of services
  const [totalServices, setTotalServices] = useState(0);
  // State to hold total number of pending bookings
  const [pendingBookings, setPendingBookings] = useState(0);
  // State to hold total number of ready bookings
  const [readyBookings, setReadyBookings] = useState(0);

  // When the component mounts, fetch the stats
  useEffect(() => {
    fetchStats();
  }, []);

  // Function to fetch services and bookings from backend
  const fetchStats = async () => {
    try {
      // Fetch all services
      const servicesRes = await axios.get("/services");
      setTotalServices(servicesRes.data.length); // Count of all services

      // Fetch all bookings
      const bookingsRes = await axios.get("/bookings");
      const bookings = bookingsRes.data;

      // Filter and count bookings based on status
      setPendingBookings(bookings.filter((b) => b.status === "PENDING").length);
      setReadyBookings(bookings.filter((b) => b.status === "READY").length);
    } catch (err) {
      console.error("Error fetching dashboard stats", err); // Error handling
    }
  };

  // JSX layout for dashboard UI
  return (
    <div
      className="container-fluid px-4 py-5"
      style={{
        // Light white overlay on top of background image
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('/assets/admin.png')",
        backgroundSize: "cover",         // Make background fit entire screen
        backgroundPosition: "center",    // Center the background image
        backgroundAttachment: "fixed",   // Fixed background while scrolling
        marginLeft: "250px",             // Offset for sidebar
        paddingTop: "80px",              // Leave space for top navbar
        minHeight: "100vh",              // Full screen height
      }}
    >

      {/* CSS styling directly in the component for card effects */}
      <style>
        {`
          .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            backdrop-filter: blur(5px);                          // Blur background behind cards
            background-color: rgba(255, 255, 255, 0.9);         // Semi-transparent white
            border: none;
          }
          .card:hover {
            transform: scale(1.05);                              // Zoom effect on hover
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);         // Shadow on hover
          }
          .stat-icon {
            font-size: 2.5rem;                                   // Icon size
          }
        `}
      </style>

      {/* Top section with logo and title */}
      <div className="text-center mb-5">
        <img
          src="/assets/bike.jpg"
          alt="Logo"
          className="rounded-circle mb-3"
          style={{
            width: "100px",
            height: "100px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)", // Shadow around logo
          }}
        />
        <h2 className="fw-bold text-dark">📊 Dashboard Overview</h2>
        <p className="text-muted">
          Monitor your bike service operations at a glance
        </p>
      </div>

      {/* Statistic Cards Row */}
      <div className="row g-4">
        {/* Total Services */}
        <div className="col-md-4">
          <div className="card h-100 text-dark text-center p-4">
            <i className="bi bi-tools stat-icon text-primary mb-3"></i>
            <h3 className="text-primary">{totalServices}</h3>
            <p className="text-muted">Total Services</p>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="col-md-4">
          <div className="card h-100 text-dark text-center p-4">
            <i className="bi bi-hourglass-split stat-icon text-warning mb-3"></i>
            <h3 className="text-warning">{pendingBookings}</h3>
            <p className="text-muted">Pending Bookings</p>
          </div>
        </div>

        {/* Ready for Delivery */}
        <div className="col-md-4">
          <div className="card h-100 text-dark text-center p-4">
            <i className="bi bi-check-circle stat-icon text-success mb-3"></i>
            <h3 className="text-success">{readyBookings}</h3>
            <p className="text-muted">Ready for Delivery</p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="row g-4 mt-4">
        <div className="col-12">
          <div className="card text-dark">
            <div className="card-body text-center">
              <h4 className="card-title text-primary mb-3">Quick Actions</h4>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {/* Button to add new service (action not wired yet) */}
                <button className="btn btn-outline-primary rounded-pill px-4">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Service
                </button>

                {/* Button to view all bookings (action not wired yet) */}
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

// Exporting the component for use in routes or sidebar
export default DashboardHome;
