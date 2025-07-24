import React from "react";

function Sidebar({ setActivePage }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h5 className="text-primary fw-bold mb-4">🛠 Admin Panel</h5>
      <div className="d-grid gap-2">
        <button className="btn btn-outline-primary" onClick={() => setActivePage("dashboard")}>
          📊 Dashboard
        </button>
        <button className="btn btn-outline-primary" onClick={() => setActivePage("services")}>
          🧰 Manage Services
        </button>
        <button className="btn btn-outline-primary" onClick={() => setActivePage("bookings")}>
          📅 Manage Bookings
        </button>
        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
