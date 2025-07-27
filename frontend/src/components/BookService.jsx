// Importing React and necessary hooks
import React, { useEffect, useState } from "react";
// Importing axios instance to make API calls
import axios from "../api/axios";
// Importing Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

// Main component to book a bike service
function BookService() {
  // State to hold all available services from backend
  const [services, setServices] = useState([]);
  // State to track which services user has selected
  const [selectedServices, setSelectedServices] = useState([]);
  // State to store the date selected by the user
  const [bookingDate, setBookingDate] = useState("");
  // State to indicate whether booking request is in progress
  const [loading, setLoading] = useState(false);

  // Getting logged-in user's ID from local storage
  const userId = localStorage.getItem("userId");

  // Runs only once when the component loads — fetch services from backend
  useEffect(() => {
    fetchServices();
  }, []);

  // Function to load service list from backend API
  const fetchServices = async () => {
    try {
      const res = await axios.get("/services"); // GET request
      setServices(res.data); // Store the result in state
    } catch (err) {
      console.error("Failed to load services", err);
      alert("Error fetching services");
    }
  };

  // Handles selection/deselection of a service when checkbox is clicked
  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId) // If already selected, remove it
        : [...prev, serviceId] // If not selected, add it
    );
  };

  // Form submit handler — runs when user clicks the "Confirm Booking" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if both date and at least one service is selected
    if (!bookingDate || selectedServices.length === 0) {
      alert(" Please select at least one service and a date.");
      return;
    }

    setLoading(true); // Show loading spinner
    setTimeout(async () => {
      try {
        // Creating payload to send to backend
        const payload = {
          customerId: userId,
          serviceIds: selectedServices,
          bookingDate,
        };

        // POST request to create a new booking
        await axios.post("/bookings", payload);

        alert(" Booking placed successfully!");

        // Clear selections after successful booking
        setSelectedServices([]);
        setBookingDate("");
      } catch (err) {
        console.error("Booking failed", err);
        alert(" Failed to place booking");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }, 3000); // Artificial 3-second delay
  };

  // Main JSX return — UI layout
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('../assets/admin.png')", // Background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <div className="container">
        <div className="bg-white bg-opacity-75 p-4 rounded shadow-sm">
          <h4 className="text-center fw-bold text-primary mb-4">
             Book a Bike Service
          </h4>

          {/* Booking Form */}
          <form onSubmit={handleSubmit}>

            {/* List of Available Services with Checkboxes */}
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

            {/* Display Selected Services Below as a List */}
            {selectedServices.length > 0 && (
              <div className="mb-4">
                <h6 className="fw-bold text-success"> Selected Services:</h6>
                <ul className="list-group">
                  {services
                    .filter((s) => selectedServices.includes(s._id)) // Filter only selected ones
                    .map((s) => (
                      <li className="list-group-item d-flex justify-content-between" key={s._id}>
                        <span>{s.serviceName}</span>
                        <span className="text-muted">₹{s.price}</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Booking Date Input */}
            <div className="mb-3">
              <label htmlFor="bookingDate" className="form-label fw-semibold">
                Choose Date:
              </label>
              <input
                type="date"
                id="bookingDate"
                className="form-control"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)} // Store selected date
                required
              />
            </div>

            {/* Confirm Booking Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading} // Disable button if loading
              >
                {loading ? (
                  <>
                     Booking in Progress...
                    {/* Spinner while waiting */}
                    <span
                      className="spinner-border spinner-border-sm ms-2"
                      role="status"
                    />
                  </>
                ) : (
                  " Confirm Booking"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Exporting the component so it can be used in other parts of the app
export default BookService;
