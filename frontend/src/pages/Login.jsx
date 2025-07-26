import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();

  // State to hold form data and loading status
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Handles input changes for form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send login request
      const res = await axios.post("/auth/login", form);
      const user = res.data;

      if (!user || !user.role) {
        alert("Invalid credentials");
        return;
      }

      // Store user details in localStorage
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role);

      // Navigate based on role
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert("Login failed. Check email and password.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0 vh-100 d-flex flex-column" style={{ 
      background: "linear-gradient(135deg, #585c6dff 0%, #0b061eff 100%)"
    }}>
      
      {/* Top Scrolling Info Bar */}
      <div className="bg-primary text-white py-2 shadow-sm">
        <marquee behavior="scroll" direction="left" scrollAmount="8">
          Book Your Bike Service Online | 24/7 Owner Support | Track Service Status in Real Time | Exclusive Offers for New Users
        </marquee>
      </div>

      {/* Main Login Section */}
      <div className="row flex-grow-1 justify-content-center align-items-center m-1">
        <div className="col-md-8 col-lg-6 col-xl-5 p-0">
          <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
            <div className="row g-0 bg-dark">
              
              {/* Left Side Image */}
              <div className="col-md-6 d-none d-md-block">
                <img 
                  src="/assets/login.png" 
                  alt="Login visual" 
                  className="img-fluid h-100" 
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Right Side Form */}
              <div className="col-md-6 p-4">
                <div className="text-center mb-4">
                  <img 
                    src="/assets/bike.jpg" 
                    alt="Logo" 
                    className="mb-3 rounded-circle"
                    style={{ width: "60px", height: "60px" }}
                  />
                  <h3 className="fw-bold text-primary">Welcome Back</h3>
                  <p className="text-primary">Please enter your credentials</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label text-muted small">Email address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary">
                        <i className="bi bi-envelope text-muted"></i>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label text-muted small">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-secondary">
                        <i className="bi bi-lock text-muted"></i>
                      </span>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="••••••••"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Login Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2 mb-3 fw-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  {/* Back to Home Button */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 py-2 mb-3"
                    onClick={() => navigate("/")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Home
                  </button>

                  {/* Register Link */}
                  <div className="text-center">
                    <p className="small text-muted mb-0">
                      Don't have an account?{" "}
                      <a 
                        href="#!" 
                        className="text-decoration-none fw-bold"
                        onClick={() => navigate("/register")}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center">
          <p className="mb-2">© 2025 Smart Bike Service Portal. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
