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
   <div
  className="pt-3"
  style={{
    paddingLeft: "2px", // enough to avoid overlap with sidebar
    paddingRight: "10px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    fontSize: "0.85rem",
  }}
>

      <div className="bg-white p-3 rounded shadow-sm">
        <h6 className="mb-3 text-primary text-center fw-bold">
          📋 Manage Bookings
        </h6>

        <div className="table-responsive">
          <table className="table table-sm table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "15%" }}>ID</th>
                <th style={{ width: "15%" }}>Customer</th>
                <th style={{ width: "25%" }}>Services</th>
                <th style={{ width: "15%" }}>Status</th>
                <th style={{ width: "15%" }}>Date</th>
                <th style={{ width: "15%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="text-break">{b._id.slice(-6)}</td>
                  <td className="text-break">{b.customer?.name || "N/A"}</td>
                  <td className="text-break">{b.services.map((s) => s.name).join(", ")}</td>
                  <td>
                    <span
                      className={`badge fw-semibold ${
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
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => setSelectedBooking(b)}
                    >
                      View
                    </button>

                    {b.status === "PENDING" && (
                      <button
                        className="btn btn-sm btn-outline-success me-1"
                        onClick={() =>
                          setConfirmAction({ id: b._id, status: "READY" })
                        }
                      >
                        Ready
                      </button>
                    )}

                    {b.status === "READY" && (
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() =>
                          setConfirmAction({ id: b._id, status: "COMPLETED" })
                        }
                      >
                        Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-muted text-center">
                    No bookings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
  