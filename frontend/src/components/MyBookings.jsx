// src/pages/MyBookings.jsx

import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`/bookings/user/${userId}`)
      .then((res) => setBookings(res.data))
      .catch(() => alert("Failed to fetch your bookings"));
  }, [userId]);

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Services</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.services.map((s) => s.serviceName).join(", ")}</td>
                <td>{b.bookingDate}</td>
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
