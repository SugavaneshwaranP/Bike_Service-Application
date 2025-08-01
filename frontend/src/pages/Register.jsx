import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();

  // Form state for input fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "CUSTOMER",
    secretCode: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state for submit button

  // Handle input field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Admin role requires secret code
    if (form.role === "ADMIN" && form.secretCode !== "bikeadmin123") {
      alert("Invalid admin secret code");
      setIsLoading(false);
      return;
    }

    try {
      // Send registration data to backend
      await axios.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        mobile: form.mobile,
        role: form.role,
      });

      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. " + (err.response?.data?.message || ""));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{ background: "linear-gradient(to right, #3f3d56, #090320)" }}
    >
      {/* Scrolling Info Bar */}
      <div className="bg-primary text-white py-2 shadow-sm">
        <marquee behavior="scroll" direction="left" scrollAmount="8">
          Book Your Bike Service Online | 24/7 Owner Support | Track Service Status in Real Time | Exclusive Offers for New Users
        </marquee>
      </div>

      {/* Register Section */}
      <div className="container d-flex justify-content-center align-items-center flex-grow-1 py-5">
        <div className="card shadow-lg rounded-4 overflow-hidden" style={{ maxWidth: "900px", width: "100%" }}>
          <div className="row g-0">
            {/* Left-side Image */}
            <div className="col-md-6 d-none d-md-block">
              <img
                src="/assets/service.jpg"
                alt="Bike Registration"
                className="img-fluid h-100"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Right-side Form */}
            <div className="col-md-6 bg-dark text-white p-4 d-flex flex-column justify-content-between">
              <div>
                {/* Logo and Heading */}
                <div className="text-center mb-3">
                  <img
                    src="/assets/bike.jpg"
                    alt="Logo"
                    className="mb-3 rounded-circle"
                    style={{ width: "70px", height: "70px" }}
                  />
                  <h4 className="fw-bold text-primary">Create Account</h4>
                  <p className="small text-muted">Join our bike service community</p>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div className="mb-3">
                    <label className="form-label text-light small">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label className="form-label text-light small">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="name@example.com"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label className="form-label text-light small">Password</label>
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="••••••••"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Mobile Number Field */}
                  <div className="mb-3">
                    <label className="form-label text-light small">Mobile Number</label>
                    <input
                      name="mobile"
                      type="text"
                      className="form-control"
                      placeholder="+91 9876543210"
                      required
                      onChange={handleChange}
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="mb-3">
                    <label className="form-label text-light small">Account Type</label>
                    <select
                      name="role"
                      className="form-select"
                      onChange={handleChange}
                      value={form.role}
                    >
                      <option value="CUSTOMER">Customer</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  {/* Admin Secret Code (Only if ADMIN is selected) */}
                  {form.role === "ADMIN" && (
                    <div className="mb-3">
                      <label className="form-label text-light small">Admin Secret Code</label>
                      <input
                        name="secretCode"
                        type="password"
                        className="form-control"
                        placeholder="Type bikeadmin123"
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {/* Submit and Back Button */}
                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary py-2 mb-3 fw-bold"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Registering...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-person-plus me-2"></i>
                          Register Now
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100 py-2 mb-3"
                      onClick={() => navigate("/")}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Back to Home
                    </button>
                  </div>
                </form>
              </div>

              {/* Login Redirect */}
              <div className="text-center pt-3">
                <p className="small text-muted mb-0">
                  Already have an account?{" "}
                  <a
                    href="#!"
                    className="text-decoration-none fw-bold text-info"
                    onClick={() => navigate("/login")}
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-2">© 2025 Smart Bike Service Portal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Register;
