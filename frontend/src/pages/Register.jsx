// src/pages/Register.jsx

import React, { useState } from "react";
import "../styles/Register.css"; // External CSS file
import { useNavigate } from "react-router-dom";

// Hardcoded secret code for Admin registration
const SECRET_CODE = "BIKEADMIN123";

function Register() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "Customer", // default role
    secret: "", // only used for Admin
  });

  // Handle all input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If user chooses Admin, validate secret code
    if (form.role === "Admin" && form.secret !== SECRET_CODE) {
      alert("❌ Invalid admin secret code!");
      return;
    }

    try {
      // Send data to backend (update the endpoint when backend is ready)
      await axios.post("/auth/register", form);
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          required
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        {/* Role selection dropdown */}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Admin Secret Code Field - Conditional */}
        {form.role === "Admin" && (
          <input
            name="secret"
            placeholder="Enter Admin Secret Code"
            required
            onChange={handleChange}
          />
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
