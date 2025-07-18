// src/pages/Login.jsx

import React, { useState } from "react";
import "../styles/Login.css"; // External CSS
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fake logic for now (since backend not connected)
      const { email } = form;

      // Simulate role check
      if (email === "admin@bike.com") {
        alert("Logged in as Admin");
        navigate("/admin/dashboard");
      } else {
        alert("Logged in as Customer");
        navigate("/services");
      }

      // Later: Replace with axios.post("/auth/login", form)
    } catch (err) {
      alert("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
