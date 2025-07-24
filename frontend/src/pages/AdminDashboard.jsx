import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";
import ManageServices from "../components/ManageServices";
import ManageBookings from "../components/ManageBookings";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardHome />;
      case "services":
        return <ManageServices />;
      case "bookings":
        return <ManageBookings />;
      default:
        return <h2 className="text-center text-secondary">🚧 Coming Soon</h2>;
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column px-0">
      {/* 🔔 Marquee */}
      <div className="bg-primary text-white py-2 text-center">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          🚀 Welcome Admin! | 🛠️ Manage Services | 📅 Track Bookings | 🎯 Monitor Dashboard | 📢 New Features Coming Soon!
        </marquee>
      </div>

      {/* 📌 Sidebar + Main Content */}
      <div className="row flex-grow-1 m-0">
        {/* Sidebar */}
        <div className="col-12 col-md-2 bg-light border-end p-3">
          <Sidebar setActivePage={setActivePage} />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-10 p-4 overflow-auto">
          <Header />
          <div className="mt-4">{renderPage()}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
