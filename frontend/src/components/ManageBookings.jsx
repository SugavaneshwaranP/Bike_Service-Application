import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import BookingDetails from "./BookingDetails";
import ConfirmActionModal from "./ConfirmActionModal";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

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

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await axios.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Booking marked as ${newStatus}`);
      fetchBookings();
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    } finally {
      setConfirmAction(null);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📋 Manage Bookings</h2>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setSelectedBooking(b)}
                  >
                    🔍 View
                  </button>

                  {b.status === "PENDING" && (
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() =>
                        setConfirmAction({ id: b._id, status: "READY" })
                      }
                    >
                      ✅ Ready
                    </button>
                  )}

                  {b.status === "READY" && (
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() =>
                        setConfirmAction({ id: b._id, status: "COMPLETED" })
                      }
                    >
                      ✔ Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔍 Booking details modal */}
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {/* ✅ Confirmation modal */}
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
