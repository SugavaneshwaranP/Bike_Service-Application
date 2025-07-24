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
    <div className="container mt-5">
      <h2 className="mb-4">📖 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Booking ID</th>
                <th>Services</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b._id}</td>
                  <td>{(b.services || []).map((s) => s.serviceName).join(", ")}</td>
                  <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        b.status === "PENDING"
                          ? "bg-warning text-dark"
                          : b.status === "READY"
                          ? "bg-info"
                          : "bg-success"
                      }`}
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
  );
}

export default MyBookings;
