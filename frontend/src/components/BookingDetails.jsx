import React from "react";

function BookingDetails({ booking, onClose }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Booking Details</h3>
        <p><strong>ID:</strong> {booking.id}</p>
        <p><strong>Customer:</strong> {booking.customer}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Status:</strong> {booking.status}</p>

        {/* List of services */}
        <p><strong>Services:</strong></p>
        <ul>
          {booking.services.map((s, idx) => <li key={idx}>{s}</li>)}
        </ul>

        {/* Close button */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default BookingDetails;
