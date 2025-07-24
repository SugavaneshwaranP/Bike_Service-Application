import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "CUSTOMER",
    secretCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.role === "ADMIN" && form.secretCode !== "bikeadmin123") {
      alert("❌ Invalid admin secret code");
      return;
    }

    try {
      await axios.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        mobile: form.mobile,
        role: form.role,
      });

      alert("✅ Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("❌ Registration failed. " + (err.response?.data?.message || ""));
      console.error(err);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "450px" }}>
        <h3 className="text-center mb-3">📝 Register</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="👤 Enter your name"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="📧 Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="🔒 Enter your password"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              name="mobile"
              type="text"
              className="form-control"
              placeholder="📱 Enter your mobile number"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <select
              name="role"
              className="form-select"
              onChange={handleChange}
              value={form.role}
            >
              <option value="CUSTOMER">👨‍🔧 Customer</option>
              <option value="ADMIN">👨‍💼 Admin</option>
            </select>
          </div>

          {form.role === "ADMIN" && (
            <div className="mb-3">
              <input
                name="secretCode"
                type="text"
                className="form-control"
                placeholder="🔐 Enter Admin Secret Code"
                onChange={handleChange}
              />
            </div>
          )}

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success">
              ✅ Register
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

export default Register;
