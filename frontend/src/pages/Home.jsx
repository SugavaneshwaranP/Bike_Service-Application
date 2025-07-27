// Import necessary dependencies
import React from "react";
import { useNavigate } from "react-router-dom"; // For programmatic navigation
import "bootstrap/dist/css/bootstrap.min.css";  // Bootstrap CSS

function Home() {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <div className="container-fluid p-0">
      
      {/*  Scrolling Information Bar at Top */}
      <div className="bg-primary text-white py-2 shadow-sm">
        <marquee behavior="scroll" direction="left" scrollAmount="8">
           Book Your Bike Service Online |  24/7 Owner Support |  Track Service Status in Real Time! |  Exclusive Offers for New Users!
        </marquee>
      </div>

      {/*  Hero Section with Background Image and Welcome Card */}
      <div 
        className="d-flex flex-column align-items-center justify-content-center vh-100 text-center px-3"
        style={{
          backgroundImage: "url('/assets/home.jpg')", // Background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Center Card with App Introduction */}
        <div 
          className="card shadow-lg p-5 bg-dark bg-opacity-80 text-white"
          style={{ 
            maxWidth: "700px",
            width: "100%",
            borderRadius: "20px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* App Logo Image with Hover Effect */}
          <img 
            src="./../assets/bike.jpg"
            alt="Bike Service Logo"
            className="img-fluid mx-auto mb-4"
            style={{
              maxWidth: "180px",
              borderRadius: "15px",
              boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
              transition: "transform 0.3s ease",
            }}
            onMouseOver={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.target.style.transform = "scale(1)"}
          />

          {/* App Title */}
          <h1 className="mb-4 text-primary" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            Smart Bike Service
          </h1>

          {/* App Description */}
          <p className="lead text-light mb-5" style={{ fontSize: "1.2rem" }}>
            Your one-stop digital pit stop! Book, track, and manage your bike services with ease. Enjoy premium services and real-time updates.
          </p>

          {/* Call to Action Buttons */}
          <div className="d-grid gap-3 mt-4">
            {/* Login Button */}
            <button
              className="btn btn-outline-primary btn-lg rounded-pill"
              onClick={() => navigate("/login")} // Navigates to login
              style={{
                transition: "all 0.3s ease",
                borderWidth: "2px",
                fontWeight: "500",
                padding: "12px 24px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#0d6efd";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#0d6efd";
              }}
            >
               Login as Customer / Owner
            </button>

            {/* Register Button */}
            <button
              className="btn btn-success btn-lg rounded-pill"
              onClick={() => navigate("/register")} // Navigates to registration
              style={{
                transition: "all 0.3s ease",
                boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
                padding: "12px 24px",
              }}
              onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.target.style.transform = "scale(1)"}
            >
               New Customer? Register Now
            </button>
          </div>
        </div>
      </div>

      {/*  Features Section */}
      <div className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 text-primary" style={{ fontWeight: "bold" }}>
            WHY CHOOSE US?
          </h2>

          {/* Feature Cards */}
          <div className="row g-4">
            {/* Feature 1: Fast Service */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <img 
                  src="./../assets/admin.png" 
                  alt="Fast Service"
                  className="img-fluid mx-auto mb-3"
                  style={{ maxWidth: "100px", borderRadius: "10px" }}
                />
                <h5 className="card-title">Fast & Reliable Service</h5>
                <p className="card-text text-muted">
                  Get your bike serviced quickly with our expert mechanics.
                </p>
              </div>
            </div>

            {/* Feature 2: Real-Time Tracking */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <img 
                  src="./../assets/image1.png" 
                  alt="Real-Time Tracking"
                  className="img-fluid mx-auto mb-3"
                  style={{ maxWidth: "100px", borderRadius: "10px" }}
                />
                <h5 className="card-title">Real-Time Tracking</h5>
                <p className="card-text text-muted">
                  Monitor your service progress live from anywhere.
                </p>
              </div>
            </div>

            {/* Feature 3: 24/7 Support */}
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <img 
                  src="./../assets/image.png"
                  alt="24/7 Support"
                  className="img-fluid mx-auto mb-3"
                  style={{ maxWidth: "100px", borderRadius: "10px" }}
                />
                <h5 className="card-title">24/7 Support</h5>
                <p className="card-text text-muted">
                  Our team is here to assist you anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Footer Section */}
      <div className="bg-dark text-white py-4">
        <div className="container text-center">
          <p className="mb-2">© 2025 Smart Bike Service Portal. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

// Export the component so it can be used in routing
export default Home;
