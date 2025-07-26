// Importing React and necessary hooks
import React, { useEffect, useState } from "react";
// Importing custom axios instance for API requests
import axios from "../api/axios";
// Importing Bootstrap styles for responsive UI
import "bootstrap/dist/css/bootstrap.min.css";

// Functional component to show logged-in user's bookings
function MyBookings() {
  // State to store bookings fetched from backend
  const [bookings, setBookings] = useState([]);

  // Get the user ID from local storage (assuming user is already logged in)
  const userId = localStorage.getItem("userId");

  // Fetch bookings only when userId is available
  useEffect(() => {
    if (userId) {
      axios
        .get(`/bookings/user/${userId}`) // API call to fetch user's bookings
        .then((res) => setBookings(res.data)) // Set response data into state
        .catch(() => alert("Failed to fetch your bookings")); // Handle error
    }
  }, [userId]); // Dependency: triggers only if userId changes

  return (
    <div
      style={{
        minHeight: "100vh", // Full screen height
        backgroundImage: "url('../assets/admin.png')", // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "60px", // Space for fixed header
        paddingBottom: "60px",
      }}
    >
      <div className="container">
        <div className="bg-white bg-opacity-75 p-4 rounded shadow-sm">
          <h4 className="text-center fw-bold text-primary mb-4">
            📖 My Bookings
          </h4>

          {/* If there are no bookings, show message */}
          {bookings.length === 0 ? (
            <div className="alert alert-info text-center">No bookings yet.</div>
          ) : (
            // Responsive table for booking list
            <div className="table-responsive">
              <table className="table table-sm table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr style={{ fontSize: "0.9rem" }}>
                    <th>Booking ID</th>
                    <th>Services</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Loop through each booking and display in a table row */}
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      {/* Show last 6 characters of booking ID for readability */}
                      <td className="text-break">{b._id.slice(-6)}</td>

                      {/* Join all service names with comma */}
                      <td>{(b.services || []).map((s) => s.serviceName).join(", ")}</td>

                      {/* Format booking date */}
                      <td>{new Date(b.bookingDate).toLocaleDateString()}</td>

                      {/* Status Badge: color changes based on status */}
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            b.status === "PENDING"
                              ? "bg-warning text-dark"
                              : b.status === "READY"
                              ? "bg-info text-white"
                              : "bg-success"
                          }`}
                          style={{ fontSize: "0.8rem" }}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Exporting component for use in routing
export default MyBookings;
