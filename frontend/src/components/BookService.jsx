import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/BookService.css";

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
      alert("✅ Booking placed successfully!");
      setSelectedServices([]);
      setBookingDate("");
    } catch (err) {
      console.error("Booking failed", err);
      alert("❌ Failed to place booking");
    }
  };

  return (
    <div className="book-service">
      <h2>📅 Book a Bike Service</h2>

      <form onSubmit={handleSubmit} className="booking-form">
        <label>Select Services:</label>
        <div className="service-options">
          {services.map((s) => (
            <div key={s._id} className="service-checkbox">
              <input
                type="checkbox"
                id={`service-${s._id}`}
                checked={selectedServices.includes(s._id)}
                onChange={() => toggleService(s._id)}
              />
              <label htmlFor={`service-${s._id}`}>
                {s.serviceName} - ₹{s.price}
              </label>
            </div>
          ))}
        </div>

        {selectedServices.length > 0 && (
          <div className="selected-services-preview">
            <h4>🧾 Selected Services:</h4>
            <ul>
              {services
                .filter((s) => selectedServices.includes(s._id))
                .map((s) => (
                  <li key={s._id}>
                    {s.serviceName} - ₹{s.price}
                  </li>
                ))}
            </ul>
          </div>
        )}

        <label htmlFor="bookingDate">Choose Date:</label>
        <input
          type="date"
          id="bookingDate"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />

        <button type="submit" className="book-btn">
          ✅ Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookService;
