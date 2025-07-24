import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BookingDetails({ booking, onClose }) {
  const [fullBooking, setFullBooking] = useState(null);

  useEffect(() => {
    if (booking?._id) {
      axios
        .get(`/bookings/${booking._id}`)
        .then((res) => setFullBooking(res.data))
        .catch(() => {
          setFullBooking(booking); // fallback to passed data
        });
    }
  }, [booking]);

  if (!booking || !fullBooking) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">📋 Booking Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>📄 Booking ID:</strong> {fullBooking._id}</p>
            <p><strong>👤 Customer:</strong> {fullBooking.customer?.name}</p>
            <p><strong>📧 Email:</strong> {fullBooking.customer?.email}</p>
            <p><strong>📅 Date:</strong> {new Date(fullBooking.bookingDate).toLocaleDateString()}</p>
            <p><strong>📌 Status:</strong> {fullBooking.status}</p>

            <hr />
            <h6>🛠️ Services</h6>
            <ul className="list-group">
              {fullBooking.services?.map((s, idx) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                  {s.name}
                  <span className="badge bg-primary rounded-pill">₹{s.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>❌ Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
