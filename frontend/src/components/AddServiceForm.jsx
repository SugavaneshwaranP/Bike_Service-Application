import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

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
        await axios.put(`/services/${service._id}`, {
          ...form,
          price: parseFloat(form.price),
        });
        alert("✅ Service updated!");
      } else {
        await axios.post("/services", {
          ...form,
          price: parseFloat(form.price),
        });
        alert("✅ New service added!");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Error saving service");
    }
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{service ? "Edit Service" : "Add New Service"}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Service Name</label>
                <input
                  name="name"
                  className="form-control"
                  placeholder="Service Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price ₹</label>
                <input
                  name="price"
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">💾 Save</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}>❌ Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddServiceForm;
