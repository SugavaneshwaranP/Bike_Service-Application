import React, { useEffect, useState } from "react";
import axios from "../api/axios";


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
    <div className="my-bookings">
      <h2>📖 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="bookings-table">
          <thead>
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
                <td>
                  {(b.services || []).map((s) => s.serviceName).join(", ")}
                </td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBookings;
