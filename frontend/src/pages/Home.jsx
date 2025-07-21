// src/pages/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // External CSS for styling

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* 🚀 Top Scrolling Info Bar */}
      <div className="home-marquee">
        <marquee behavior="scroll" direction="left" scrollamount="6">
          🚲 Book Your Bike Service Online | 🛠️ 24/7 Owner Support | 📍 Track Service Status in Real Time!
        </marquee>
      </div>

      {/* 💡 Hero Card Section */}
      <div className="home-card">
        <h1 className="home-title">Smart Bike Service Portal</h1>

        <p className="home-subtitle">
          Welcome to your digital pit stop! Book, track, and manage your bike
          services effortlessly.
        </p>

        <div className="home-buttons">
          <button className="btn btn-login" onClick={() => navigate("/login")}>
            🚀 Login as Customer / Owner
          </button>
          <button className="btn btn-register" onClick={() => navigate("/register")}>
            📝 New Customer? Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
