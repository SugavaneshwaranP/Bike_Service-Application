import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import BookingDetails from "./BookingDetails";
import ConfirmActionModal from "./ConfirmActionModal";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  // 🔃 Fetch bookings from backend
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      alert("Failed to fetch bookings");
      console.error(err);
    }
  };

  // ✅ Handle status update (PENDING → READY → COMPLETED)
  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Booking marked as ${newStatus}`);
      fetchBookings(); // Refresh list
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    } finally {
      setConfirmAction(null);
    }
  };

  return (
    <div>
      <h2>Manage Bookings</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Services</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b._id}</td>
              <td>{b.customer?.name || "N/A"}</td>
              <td>{b.services.map((s) => s.name).join(", ")}</td>
              <td>{b.status}</td>
              <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setSelectedBooking(b)}>🔍 View</button>

                {b.status === "PENDING" && (
                  <button onClick={() => setConfirmAction({ id: b._id, status: "READY" })}>
                    ✅ Ready
                  </button>
                )}
                {b.status === "READY" && (
                  <button onClick={() => setConfirmAction({ id: b._id, status: "COMPLETED" })}>
                    ✔ Completed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 👁 Booking details modal */}
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {/* ✅ Confirm status update modal */}
      {confirmAction && (
        <ConfirmActionModal
          message={`Mark booking #${confirmAction.id} as ${confirmAction.status}?`}
          onConfirm={() =>
            handleStatusUpdate(confirmAction.id, confirmAction.status)
          }
          onCancel={() => setConfirmAction(null)}
        />
      )}
    </div>
  );
}

export default ManageBookings;
