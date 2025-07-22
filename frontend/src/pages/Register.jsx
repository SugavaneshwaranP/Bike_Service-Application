// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Register.css";

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
      const res = await axios.post("/auth/register", {
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
    <div className="register-container">
      {/* 🔁 Marquee banner */}
      <div className="register-marquee">
        Join the Ride | 👤 Register as Customer or Admin | 🚀 Quick Bike Service Bookings
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          name="name"
          type="text"
          placeholder="👤 Enter your name"
          required
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="📧 Enter your email"
          required
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="🔒 Enter your password"
          required
          onChange={handleChange}
        />
        <input
          name="mobile"
          type="text"
          placeholder="📱 Enter your mobile number"
          required
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange} value={form.role}>
          <option value="CUSTOMER">👨‍🔧 Customer</option>
          <option value="ADMIN">👨‍💼 Admin</option>
        </select>

        {form.role === "ADMIN" && (
          <input
            name="secretCode"
            type="text"
            placeholder="🔐 Enter Admin Secret Code"
            onChange={handleChange}
          />
        )}

        <button type="submit">✅ Register</button>

        {/* 🔙 Back to Home Button */}
        <button
          type="button"
          style={{
            backgroundColor: "#f97316",
            marginTop: "8px",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            fontWeight: "500",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          ⬅️ Back to Home
        </button>
      </form>
    </div>
  );
}

export default Register;
