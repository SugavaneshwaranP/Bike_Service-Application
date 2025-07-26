import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`/bookings/user/${userId}`)
        .then((res) => setBookings(res.data))
        .catch(() => alert("Failed to fetch your bookings"));
    }
  }, [userId]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('../assets/admin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container">
        <div className="bg-white bg-opacity-75 p-4 rounded shadow-sm">
          <h4 className="text-center fw-bold text-primary mb-4">
            📖 My Bookings
          </h4>

          {bookings.length === 0 ? (
            <div className="alert alert-info text-center">No bookings yet.</div>
          ) : (
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
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td className="text-break">{b._id.slice(-6)}</td>
                      <td>{(b.services || []).map((s) => s.serviceName).join(", ")}</td>
                      <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
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

export default MyBookings;
