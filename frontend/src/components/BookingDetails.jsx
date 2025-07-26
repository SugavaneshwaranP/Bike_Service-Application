// Importing React and required hooks
import React, { useEffect, useState } from "react";
// Importing Axios instance to make API requests
import axios from "../api/axios";
// Importing Bootstrap styles for modal and UI
import "bootstrap/dist/css/bootstrap.min.css";

// Declaring the functional component 'BookingDetails' which receives booking data and onClose handler
function BookingDetails({ booking, onClose }) {
  // Declaring state variable 'fullBooking' to hold complete booking details (from API or fallback)
  const [fullBooking, setFullBooking] = useState(null);

  // useEffect runs whenever the 'booking' prop changes
  useEffect(() => {
    // Check if booking and booking._id exists before making API call
    if (booking?._id) {
      // Fetch full booking details from backend
      axios
        .get(`/bookings/${booking._id}`)
        .then((res) => setFullBooking(res.data)) // Set fetched data
        .catch(() => {
          setFullBooking(booking); // If API call fails, use the passed booking data as fallback
        });
    }
  }, [booking]); // Dependency array - effect will re-run when 'booking' changes

  // If there's no booking or fullBooking data yet, return nothing (don't render the modal)
  if (!booking || !fullBooking) return null;

  // JSX for rendering the booking details modal
  return (
    // Bootstrap modal with custom semi-transparent dark background
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Modal header with title and close button */}
          <div className="modal-header">
            <h5 className="modal-title">📋 Booking Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* Modal body with booking data */}
          <div className="modal-body">
            {/* Display booking ID */}
            <p><strong>📄 Booking ID:</strong> {fullBooking._id}</p>
            {/* Display customer name (using optional chaining to prevent error) */}
            <p><strong>👤 Customer:</strong> {fullBooking.customer?.name}</p>
            {/* Display customer email */}
            <p><strong>📧 Email:</strong> {fullBooking.customer?.email}</p>
            {/* Format and display booking date */}
            <p><strong>📅 Date:</strong> {new Date(fullBooking.bookingDate).toLocaleDateString()}</p>
            {/* Display booking status */}
            <p><strong>📌 Status:</strong> {fullBooking.status}</p>

            <hr />
            {/* Section heading for services list */}
            <h6>🛠️ Services</h6>
            <ul className="list-group">
              {/* Loop through services and render each one */}
              {fullBooking.services?.map((s, idx) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={idx}>
                  {s.name} {/* Service name */}
                  <span className="badge bg-primary rounded-pill">₹{s.price}</span> {/* Service price */}
                </li>
              ))}
            </ul>
          </div>

          {/* Modal footer with close button */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>❌ Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the component to be used in other parts of the application
export default BookingDetails;
