// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Register.css"; // optional

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

    // Admin role validation
    if (form.role === "ADMIN" && form.secretCode !== "bikeadmin123") {
      alert("Invalid admin secret code");
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

      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. " + err.response?.data?.message || "");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          required
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          onChange={handleChange}
        />
        <input
          name="mobile"
          type="text"
          placeholder="Enter your mobile number"
          required
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange} value={form.role}>
          <option value="CUSTOMER">Customer</option>
          <option value="ADMIN">Admin</option>
        </select>

        {form.role === "ADMIN" && (
          <input
            name="secretCode"
            type="text"
            placeholder="Enter Admin Secret Code"
            onChange={handleChange}
          />
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
