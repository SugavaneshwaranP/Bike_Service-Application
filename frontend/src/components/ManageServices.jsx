import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "../styles/ManageServices.css";

function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
  serviceName: "",
  description: "",
  price: "",
});


  const [editingId, setEditingId] = useState(null);

  const ownerId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole"); // check if ADMIN

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const ownerId = localStorage.getItem("userId");

  const formattedData = {
    serviceName: form.serviceName, // ✅ not 'name'
    description: form.description,
    price: parseFloat(form.price),
    ownerId, // ✅ required by schema
  };

  try {
    if (editingId) {
      await axios.put(`/services/${editingId}`, formattedData);
      alert("✅ Service updated successfully!");
    } else {
      await axios.post("/services", formattedData);
      alert("✅ New service added!");
    }

    // reset
    setForm({ serviceName: "", description: "", price: "" });
    setEditingId(null);
    fetchServices();
  } catch (err) {
    alert("❌ Error while saving service");
    console.error(err);
  }
};


  const handleEdit = (service) => {
    setForm({
      serviceName: service.serviceName,
      description: service.description,
      price: service.price,
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`/services/${id}`);
        alert("🗑️ Service deleted!");
        fetchServices();
      } catch (err) {
        console.error("❌ Failed to delete service", err);
        alert("❌ Could not delete service");
      }
    }
  };

  return (
    <div className="manage-services">
      <h2>🛠️ Manage Bike Services</h2>

      {/* ✅ Show Add Form Only for Admin */}
      {userRole === "ADMIN" && (
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
      )}

      {/* 📋 Table of Services */}
      <table className="service-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service</th>
            <th>Description</th>
            <th>Price (₹)</th>
            {userRole === "ADMIN" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s._id}</td>
              <td>{s.serviceName}</td>
              <td>{s.description}</td>
              <td>{s.price}</td>
              {userRole === "ADMIN" && (
                <td>
                  <button onClick={() => handleEdit(s)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(s._id)}>🗑️ Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageServices;
