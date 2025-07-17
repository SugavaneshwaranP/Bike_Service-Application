// src/pages/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // External CSS file for styling

function Home() {
  const navigate = useNavigate(); // Hook to programmatically navigate between pages

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-card">
        <h1 className="home-title">Smart Bike Service Portal</h1>

        <p className="home-subtitle">
          Welcome to your digital pit stop. Book, track, and get your bike
          serviced — all in a few clicks.
        </p>

        {/* Buttons for user actions */}
        <div className="home-buttons">
          <button className="btn btn-login" onClick={() => navigate("/login")}>
            Login as Customer / Owner
          </button>
          <button
            className="btn btn-register"
            onClick={() => navigate("/register")}
          >
            New Customer? Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
