import React, { useState } from "react";

const availableServices = [
  { id: 1, name: "General Service" },
  { id: 2, name: "Oil Change" },
  { id: 3, name: "Water Wash" },
];

function BookService() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState("");

  const handleCheckbox = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookingDate || selectedServices.length === 0) {
      alert("Please select at least one service and a date.");
      return;
    }

    const selectedNames = availableServices
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.name);

    alert(`Booking Confirmed!\nDate: ${bookingDate}\nServices: ${selectedNames.join(", ")}`);

    setBookingDate("");
    setSelectedServices([]);
  };

  return (
    <div>
      <h2>🛠 Book a Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Select Services:</p>
          {availableServices.map((service) => (
            <label key={service.id} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={service.id}
                checked={selectedServices.includes(service.id)}
                onChange={() => handleCheckbox(service.id)}
              />
              {service.name}
            </label>
          ))}
        </div>

        <div style={{ marginTop: "15px" }}>
          <label>
            Select Booking Date:{" "}
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </label>
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookService;
