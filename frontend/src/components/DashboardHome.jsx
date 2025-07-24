// src/components/DashboardHome.jsx

import React, { useEffect, useState } from "react";
import axios from "../api/axios";

function DashboardHome() {
  const [totalServices, setTotalServices] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [readyBookings, setReadyBookings] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get all services
      const servicesRes = await axios.get("/services");
      setTotalServices(servicesRes.data.length);

      // Get all bookings
      const bookingsRes = await axios.get("/bookings");
      const bookings = bookingsRes.data;

      // Filter bookings by status
      const pending = bookings.filter((b) => b.status === "PENDING");
      const ready = bookings.filter((b) => b.status === "READY");

      setPendingBookings(pending.length);
      setReadyBookings(ready.length);
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>
      <div className="stat-boxes">
        <div className="stat-box">
          <h3>{totalServices}</h3>
          <p>Total Services</p>
        </div>
        <div className="stat-box">
          <h3>{pendingBookings}</h3>
          <p>Pending Bookings</p>
        </div>
        <div className="stat-box">
          <h3>{readyBookings}</h3>
          <p>Ready for Delivery</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
