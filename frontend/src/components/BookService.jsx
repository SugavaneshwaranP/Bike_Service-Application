import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function BookService() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState("");

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
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookingDate || selectedServices.length === 0) {
      alert("❌ Please select at least one service and a date.");
      return;
    }

    try {
      const payload = {
        customerId: userId,
        serviceIds: selectedServices,
        bookingDate,
      };

      await axios.post("/bookings", payload);
      alert("✅ Booking placed successfully! ");
      setSelectedServices([]);
      setBookingDate("");
    } catch (err) {
      console.error("Booking failed", err);
      alert("❌ Failed to place booking");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📅 Book a Bike Service</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Services:</label>
          <div className="row">
            {services.map((s) => (
              <div key={s._id} className="col-md-6 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`service-${s._id}`}
                    checked={selectedServices.includes(s._id)}
                    onChange={() => toggleService(s._id)}
                  />
                  <label className="form-check-label" htmlFor={`service-${s._id}`}>
                    {s.serviceName} - ₹{s.price}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedServices.length > 0 && (
          <div className="mb-4">
            <h5>🧾 Selected Services:</h5>
            <ul className="list-group">
              {services
                .filter((s) => selectedServices.includes(s._id))
                .map((s) => (
                  <li className="list-group-item" key={s._id}>
                    {s.serviceName} - ₹{s.price}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="bookingDate" className="form-label">Choose Date:</label>
          <input
            type="date"
            id="bookingDate"
            className="form-control"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          ✅ Confirm Booking(wait for confirmation)
        </button>
      </form>
    </div>
  );
}

export default BookService;
