import React, { useState } from "react";
import BookService from "../components/BookService";
import MyBookings from "../components/MyBookings";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomerDashboard() {
  const [activePage, setActivePage] = useState("book");

  return (
    <div className="container-fluid px-0">
      <div className="row g-0 min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-4">
          <h4 className="mb-4">👤 Customer Panel</h4>
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
              📄 My Bookings
            </button>
            <button
              className="btn btn-outline-danger mt-3"
              onClick={() => window.location.href = "/"}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 bg-light p-4">
          {activePage === "book" && <BookService />}
          {activePage === "mybookings" && <MyBookings />}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
