import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BookService() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to load services", err);
      alert("Error fetching services");
    }
  };

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate || selectedServices.length === 0) {
      alert("❌ Please select at least one service and a date.");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      try {
        const payload = {
          customerId: userId,
          serviceIds: selectedServices,
          bookingDate,
        };

        await axios.post("/bookings", payload);
        alert("✅ Booking placed successfully!");
        setSelectedServices([]);
        setBookingDate("");
      } catch (err) {
        console.error("Booking failed", err);
        alert("❌ Failed to place booking");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('../assets/admin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container">
        <div className="bg-white bg-opacity-75 p-4 rounded shadow-sm">
          <h4 className="text-center fw-bold text-primary mb-4">
            📅 Book a Bike Service
          </h4>

          <form onSubmit={handleSubmit}>
            {/* Services Section */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Services:</label>
              <div className="row">
                {services.map((s) => (
                  <div key={s._id} className="col-12 col-md-6 mb-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`service-${s._id}`}
                        checked={selectedServices.includes(s._id)}
                        onChange={() => toggleService(s._id)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`service-${s._id}`}
                      >
                        {s.serviceName} - ₹{s.price}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Services List */}
            {selectedServices.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold text-success">🧾 Selected Services:</h6>
                <ul className="list-group">
                  {services
                    .filter((s) => selectedServices.includes(s._id))
                    .map((s) => (
                      <li className="list-group-item d-flex justify-content-between" key={s._id}>
                        <span>{s.serviceName}</span>
                        <span className="text-muted">₹{s.price}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Booking Date */}
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label fw-semibold">
                Choose Date:
              </label>
              <input
                type="date"
                id="bookingDate"
                className="form-control"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    ⏳ Booking in Progress...
                    <span
                      className="spinner-border spinner-border-sm ms-2"
                      role="status"
                    />
                  </>
                ) : (
                  "✅ Confirm Booking"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookService;
