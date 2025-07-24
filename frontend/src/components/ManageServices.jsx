// src/components/ManageServices.jsx

import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // Axios instance pointing to Spring Boot backend
import "../styles/ManageServices.css"; // External CSS

function ManageServices() {
  const [services, setServices] = useState([]);
  const ownerId = localStorage.getItem("userId"); // or whatever key you store


  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null); // null = add, ID = edit mode

  // 🔁 Fetch all services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  // 🔄 Load all services from backend
  const fetchServices = async () => {
    try {
      const res = await axios.get("/services"); // GET /api/services
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  // 🔄 Handle input change for form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const formattedData = {
    ...form,
    price: parseFloat(form.price),
  ownerId: ownerId,  // ✅ must include
    };

  try {
    if (editingId) {
      await axios.put(`/services/${editingId}`, formattedData);
      alert("✅ Service updated successfully!");
    } else {
      await axios.post("/services", formattedData);
      alert("✅ New service added!");
    }

    setForm({ serviceName: "", description: "", price: "" });
    setEditingId(null);
    fetchServices();
  } catch (err) {
    alert("❌ Error while saving service");
    console.error(err);
  }
};


  // ✏️ Edit mode - preload form
  const handleEdit = (service) => {
    setForm({
      serviceName: service.serviceName,
      description: service.description,
      price: service.price,
    });
    setEditingId(service.id);
  };

  // 🗑 Delete a service
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`/services/${id}`);
        alert("🗑️ Service deleted!");
        fetchServices();
      } catch (err) {
        alert("❌ Failed to delete service");
        console.error(err);
      }
    }
  };

  return (
    <div className="manage-services">
      <h2>🛠️ Manage Bike Services</h2>

      {/* 🔧 Add or Update Form */}
      <form onSubmit={handleSubmit} className="service-form">
        <input
          name="serviceName"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Service</button>
      </form>

      {/* 📋 Table of Services */}
      <table className="service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.serviceName}</td>
              <td>{s.description}</td>
              <td>{s.price}</td>
              <td>
                <button onClick={() => handleEdit(s)}>✏️ Edit</button>
                <button onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageServices;
