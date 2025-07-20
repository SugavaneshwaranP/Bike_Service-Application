// src/components/BookingDetails.jsx

import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function BookingDetails({ booking, onClose }) {
  const [fullBooking, setFullBooking] = useState(null);

  useEffect(() => {
    if (booking?.id) {
      axios
        .get(`/bookings/${booking.id}`)
        .then((res) => setFullBooking(res.data))
        .catch(() => alert("Error loading booking details"));
    }
  }, [booking]);

  if (!booking || !fullBooking) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Booking Details</h3>

        <p><strong>Booking ID:</strong> {fullBooking.id}</p>
        <p><strong>Customer:</strong> {fullBooking.customer?.name}</p>
        <p><strong>Email:</strong> {fullBooking.customer?.email}</p>
        <p><strong>Date:</strong> {fullBooking.bookingDate}</p>
        <p><strong>Status:</strong> {fullBooking.status}</p>

        <p><strong>Services:</strong></p>
        <ul>
          {fullBooking.services?.map((s, idx) => (
            <li key={idx}>
              {s.serviceName} - ₹{s.price}
            </li>
          ))}
        </ul>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default BookingDetails;
