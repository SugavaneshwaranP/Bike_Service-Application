import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/login", form);
      const user = res.data;

      if (!user || !user.role) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role);

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      alert("Login failed. Check email and password.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">🔐 Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              🚀 Login
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => navigate("/")}
            >
              ⬅️ Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
