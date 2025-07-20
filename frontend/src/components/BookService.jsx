// src/pages/BookService.jsx

import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/BookService.css";

function BookService() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
const [bookingDate, setBookingDate] = useState(""); // ✅ CORRECT
  const userId = localStorage.getItem("userId");

  // Fetch all services on component mount
  useEffect(() => {
    axios
      .get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Service fetch failed", err));
  }, []);

  // Toggle selection of service
  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((sid) => sid !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
  if (!bookingDate || selectedServices.length === 0) {
    alert("Please select services and a date");
    return;
  }

  try {
    await axios.post("/bookings", {
  customerId: userId,
  serviceIds: selectedServices,
  bookingDate: bookingDate,
});


    alert("Booking successful!");
    setSelectedServices([]);
    setBookingDate("");
  } catch (err) {
    alert("Failed to book service");
    console.error(err);
  }
};


  return (
    <div className="book-service">
      <h2>🛠️ Book Bike Service</h2>

      {/* Services Table */}
      <table className="service-table">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Service Name</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(s.id)}
                  onChange={() => toggleService(s.id)}
                />
              </td>
              <td>{s.id}</td>
              <td>{s.serviceName}</td>
              <td>{s.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Booking Date */}
      <div className="input-group" style={{ marginTop: "20px" }}>
        <label>Select Booking Date: </label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        className="book-btn"
        style={{ marginTop: "20px" }}
        onClick={handleBooking}
      >
         Book Service
      </button>
    </div>
  );
}

export default BookService;
