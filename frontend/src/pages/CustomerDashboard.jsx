// Import necessary dependencies and components
import React, { useState } from "react";
import BookService from "../components/BookService";   // Component to book bike services
import MyBookings from "../components/MyBookings";     // Component to view user's bookings
import "bootstrap/dist/css/bootstrap.min.css";         // Bootstrap CSS for styling

function CustomerDashboard() {
  // State to track which section is currently active: "book" or "mybookings"
  const [activePage, setActivePage] = useState("book");

  return (
    <div className="container-fluid px-0">
      {/* Full-height layout divided into sidebar and content area */}
      <div className="row g-0 min-vh-100">
        
        {/* ------------------- Sidebar ------------------- */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4">
          <h4 className="mb-4">👤 Customer Panel</h4>

          {/* Sidebar Buttons: Use dynamic styling based on active page */}
          <div className="d-grid gap-2">
            <button
              className={`btn btn-${activePage === "book" ? "primary" : "outline-light"}`}
              onClick={() => setActivePage("book")}
            >
              🛠 Book Service
            </button>

            <button
              className={`btn btn-${activePage === "mybookings" ? "primary" : "outline-light"}`}
              onClick={() => setActivePage("mybookings")}
            >
               My Bookings
            </button>

            {/* Logout Button: Redirects to homepage */}
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => window.location.href = "/"}
            >
               Logout
            </button>
          </div>
        </div>

        {/* ------------------- Main Content Area ------------------- */}
        <div className="col-md-9 col-lg-10 bg-light p-4">
          {/* Render the BookService component if 'book' is active */}
          {activePage === "book" && <BookService />}

          {/* Render the MyBookings component if 'mybookings' is active */}
          {activePage === "mybookings" && <MyBookings />}
        </div>
      </div>
    </div>
  );
}

// Exporting the component so it can be used in routes or App
export default CustomerDashboard;
