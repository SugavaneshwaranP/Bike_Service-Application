import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import BookingDetails from "./BookingDetails";
import ConfirmActionModal from "./ConfirmActionModal";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageBookings() {
  // State to store all bookings
  const [bookings, setBookings] = useState([]);

  // State to store the currently selected booking for viewing details
  const [selectedBooking, setSelectedBooking] = useState(null);

  // State to manage confirmation modal for status update
  const [confirmAction, setConfirmAction] = useState(null);

  // State to indicate which booking is being updated (for showing spinner)
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch bookings once the component is mounted
  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to fetch all bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      alert("Failed to fetch bookings");
      console.error(err);
    }
  };

  // Function to update booking status (READY or COMPLETED)
  const handleStatusUpdate = async (bookingId, newStatus) => {
    setUpdatingId(bookingId); // Show spinner for the button being clicked

    try {
      await axios.put(`/bookings/${bookingId}/status`, { status: newStatus });
      alert(`Booking marked as ${newStatus}`);
      fetchBookings(); // Refresh bookings after update
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    } finally {
      setUpdatingId(null);    // Reset spinner state
      setConfirmAction(null); // Close confirmation modal
    }
  };

  return (
    <div
      className="pt-3"
      style={{
        paddingLeft: "2px",
        paddingRight: "10px",
        backgroundColor: "#ccd7e3ff",
        minHeight: "100vh",
        fontSize: "0.85rem",
      }}
    >
      <div className="bg-white p-3 rounded shadow-sm">
        <h4 className="mb-3 text-primary text-center fw-bold">
          Manage Bookings 👉
        </h4>

        {/* Scrollable table to prevent overflow */}
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

                  {/* Display all services joined by comma */}
                  <td className="text-break">
                    {b.services.map((s) => s.serviceName).join(", ")}
                  </td>

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

                  {/* Display formatted date */}
                  <td>{new Date(b.bookingDate).toLocaleDateString()}</td>

                  <td>
                    {/* View button */}
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => setSelectedBooking(b)}
                    >
                      View
                    </button>

                    {/* Ready button (if status is PENDING) */}
                    {b.status === "PENDING" && (
                      <button
                        className="btn btn-sm btn-outline-success me-1"
                        disabled={updatingId === b._id}
                        onClick={() =>
                          setConfirmAction({ id: b._id, status: "READY" })
                        }
                      >
                        {updatingId === b._id ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Updating...
                          </>
                        ) : (
                          "Ready"
                        )}
                      </button>
                    )}

                    {/* Completed button (if status is READY) */}
                    {b.status === "READY" && (
                      <button
                        className="btn btn-sm btn-outline-success"
                        disabled={updatingId === b._id}
                        onClick={() =>
                          setConfirmAction({ id: b._id, status: "COMPLETED" })
                        }
                      >
                        {updatingId === b._id ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                            ></span>
                            Updating...
                          </>
                        ) : (
                          "Completed"
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* Show message when no bookings available */}
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

      {/*  Booking Details Modal */}
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

      {/*  Confirmation Modal for status update */}
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
