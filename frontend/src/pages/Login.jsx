// src/pages/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/Login.css";

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

      // Store user info in localStorage (or Context later)
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role);

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard"); // Or /services
      }

      alert(`Logged in as ${user.role}`);
    } catch (err) {
      alert("Login failed. Check email and password.");
      console.error(err);
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
