import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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
  <div className="pt-3 " style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
<div className="ms-lg-3 me-1 p-1 bg-white rounded shadow-sm"

    style={{
      marginLeft: "250px", // offset for sidebar only
      marginRight: "10px", // allow slight margin on small screens
    }}
  >
    <h4 className="mb-3 fw-bold text-center text-primary">
      <i className="bi bi-tools me-2"></i>Manage Bike Services 👉
    </h4>

    {/* Form Section */}
    <form onSubmit={handleSubmit} className="row gx-2 gy-2 mb-3"style={{ fontSize: "0.90rem" }}>
      <div className="col-6 col-md-3">
        <input
          type="text"
          name="serviceName"
          className="form-control form-control-sm"
          placeholder="Service Name"
          value={form.serviceName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6 col-md-3">
        <input
          type="text"
          name="description"
          className="form-control form-control-sm"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6 col-md-2">
        <input
          type="number"
          name="price"
          className="form-control form-control-sm"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-6 col-md-2 d-grid">
        <button type="submit" className="btn btn-sm btn-primary">
          {editingId ? "Update" : "Add"} Service
        </button>
      </div>
    </form>

    {/* Table Section */}
    <div className="table-responsive">
      <table className="table table-sm table-bordered text-center align-middle" style={{ fontSize: "0.90rem" }}>
        <thead className="table-dark">
          <tr>
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "20%" }}>Service</th>
            <th style={{ width: "35%" }}>Description</th>
            <th style={{ width: "15%" }}>Price</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((s) => (
              <tr key={s._id}>
                <td className="text-break">{s._id.slice(-6)}</td>
                <td className="text-break">{s.serviceName}</td>
                <td className="text-break">{s.description}</td>
                <td>₹{s.price}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(s)}>✏️</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s._id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-muted">No services available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>


  );
}

export default ManageServices;
