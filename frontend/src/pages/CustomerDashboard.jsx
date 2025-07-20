import React, { useState } from "react";
import BookService from "../components/BookService";
import MyBookings from "../components/MyBookings";
import "../styles/Customer.css"; // Include shared styles

function CustomerDashboard() {
  const [activePage, setActivePage] = useState("book");

  return (
    <div className="customer-dashboard">
      <div className="sidebar">
        <button onClick={() => setActivePage("book")}>🛠 Book Service</button>
        <button onClick={() => setActivePage("mybookings")}>📄 My Bookings</button>
        <button onClick={() => window.location.href = "/"}>🚪 Logout</button>
      </div>

      <div className="dashboard-content">
        {activePage === "book" && <BookService />}
        {activePage === "mybookings" && <MyBookings />}
      </div>
    </div>
  );
}

export default CustomerDashboard;
