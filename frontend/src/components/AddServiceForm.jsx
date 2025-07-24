// src/components/AddServiceForm.jsx

import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../styles/AddServiceForm.css"; // Optional styling

function AddServiceForm({ service, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        description: service.description,
        price: service.price,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Service Name and Price are required");
      return;
    }

    try {
      if (service) {
        // PUT: Update existing service
        await axios.put(`/services/${service._id}`, {
          ...form,
          price: parseFloat(form.price),
        });
        alert("Service updated!");
      } else {
        // POST: Create new service
        await axios.post("/services", {
          ...form,
          price: parseFloat(form.price),
        });
        alert("New service added!");
      }

      onSuccess(); // Reload service list
    } catch (err) {
      console.error(err);
      alert("Error saving service");
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-content">
        <h3>{service ? "Edit Service" : "Add New Service"}</h3>

        <input
          name="name"
          placeholder="Service Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <div className="form-buttons">
          <button type="submit">💾 Save</button>
          <button type="button" onClick={onCancel}>❌ Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddServiceForm;
