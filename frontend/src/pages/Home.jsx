import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      {/* 🚀 Top Scrolling Info Bar */}
      <div className="bg-primary text-white py-2">
        <marquee behavior="scroll" direction="left" scrollAmount="6">
          🚲 Book Your Bike Service Online | 🛠️ 24/7 Owner Support | 📍 Track Service Status in Real Time!
        </marquee>
      </div>

      {/* 💡 Hero Card Section */}
      <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center px-3">
        <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
          <h1 className="mb-3 text-primary">Smart Bike Service Portal</h1>
          <p className="lead text-muted">
            Welcome to your digital pit stop! Book, track, and manage your bike services effortlessly.
          </p>

          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate("/login")}
            >
              🚀 Login as Customer / Owner
            </button>
            <button
              className="btn btn-success btn-lg"
              onClick={() => navigate("/register")}
            >
              📝 New Customer? Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
