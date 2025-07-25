import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ serviceName: "", description: "", price: "" });
  const [editingId, setEditingId] = useState(null);

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
    const { serviceName, description, price } = form;

    if (!serviceName || !description || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      const payload = {
        serviceName,
        description,
        price,
        ownerId: localStorage.getItem("userId"),
      };

      if (editingId) {
        await axios.put(`/services/${editingId}`, payload);
        alert("✅ Service updated!");
      } else {
        await axios.post("/services", payload);
        alert("✅ Service added!");
      }

      fetchServices();
      setForm({ serviceName: "", description: "", price: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving service:", err);
      alert("❌ Failed to save service");
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
        console.error("Failed to delete service", err);
        alert("❌ Failed to delete service");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛠️ Manage Bike Services</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="serviceName"
            className="form-control"
            placeholder="Service Name"
            value={form.serviceName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update" : "Add"} Service
          </button>
        </div>
      </form>

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
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
            <tr key={s._id}>
              <td>{s._id}</td>
              <td>{s.serviceName}</td>
              <td>{s.description}</td>
              <td>₹{s.price}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(s)}>
                  ✏️ Edit
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageServices;
