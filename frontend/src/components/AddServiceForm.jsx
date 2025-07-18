// src/components/AddServiceForm.jsx

import React, { useState, useEffect } from "react";

function AddServiceForm({ service, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (service) {
      setForm(service);
    }
  }, [service]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Name and Price are required!");
      return;
    }
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
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

        <button type="submit">💾 Save</button>
        <button type="button" onClick={onCancel}>❌ Cancel</button>
      </form>
    </div>
  );
}

export default AddServiceForm;
