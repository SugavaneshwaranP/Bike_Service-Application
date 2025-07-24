import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function DashboardHome() {
  const [totalServices, setTotalServices] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [readyBookings, setReadyBookings] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const servicesRes = await axios.get("/services");
      setTotalServices(servicesRes.data.length);

      const bookingsRes = await axios.get("/bookings");
      const bookings = bookingsRes.data;

      const pending = bookings.filter((b) => b.status === "PENDING");
      const ready = bookings.filter((b) => b.status === "READY");

      setPendingBookings(pending.length);
      setReadyBookings(ready.length);
    } catch (err) {
      console.error("Error fetching dashboard stats", err);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">📊 Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card text-white bg-primary h-100">
            <div className="card-body text-center">
              <h3 className="card-title">{totalServices}</h3>
              <p className="card-text">Total Services</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-warning h-100">
            <div className="card-body text-center">
              <h3 className="card-title">{pendingBookings}</h3>
              <p className="card-text">Pending Bookings</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white bg-success h-100">
            <div className="card-body text-center">
              <h3 className="card-title">{readyBookings}</h3>
              <p className="card-text">Ready for Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
