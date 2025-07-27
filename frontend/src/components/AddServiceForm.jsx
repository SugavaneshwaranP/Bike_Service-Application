// Importing necessary hooks and modules from React
import React, { useState, useEffect } from "react";
// Importing custom Axios instance to make API calls
import axios from "../api/axios";
// Importing Bootstrap styles for UI components
import "bootstrap/dist/css/bootstrap.min.css";

// Declaring a functional React component with props: service, onSuccess, and onCancel
function AddServiceForm({ service, onSuccess, onCancel }) {

  // Declaring a state variable 'form' to store form input values
  const [form, setForm] = useState({
    serviceName: "",      // Service Name input field
    description: "",      // Description input field
    price: "",            // Price input field
  });

  // useEffect runs when 'service' prop changes; useful for prefilling form during edit
  useEffect(() => {
    if (service) {
      // Setting form values if service exists (editing mode)
      setForm({
        name: service.name,
        description: service.description,
        price: service.price,
      });
    }
  }, [service]); // Dependency array - runs when 'service' changes

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    // Updating the specific field in form using the input's name and value
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form refresh behavior

    // Validation: Alert if name or price is empty
    if (!form.name || !form.price) {
      alert("Service Name and Price are required");
      return; // Stop further execution
    }

    try {
      // If editing existing service
      if (service) {
        // Send PUT request to update service with new data
        await axios.put(`/services/${service._id}`, {
          ...form,
          price: parseFloat(form.price), // Convert price to float
        });
        alert(" Service updated!"); // Success alert
      } else {
        // Else, send POST request to add new service
        await axios.post("/services", {
          ...form,
          price: parseFloat(form.price), // Convert price to float
        });
        alert(" New service added!"); // Success alert
      }

      onSuccess(); // Call parent's success callback to refresh list or close form
    } catch (err) {
      console.error(err); // Log error in console
      alert(" Error saving service"); // Error alert
    }
  };

  // JSX to render the modal form UI
  return (
    // Main modal container with Bootstrap classes and semi-transparent background
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Form submission handler */}
          <form onSubmit={handleSubmit}>
            {/* Modal header with title and cancel (close) button */}
            <div className="modal-header">
              <h5 className="modal-title">{service ? "Edit Service" : "Add New Service"}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>

            {/* Modal body with form fields */}
            <div className="modal-body">

              {/* Service Name Input */}
              <div className="mb-3">
                <label className="form-label">Service Name</label>
                <input
                  name="name"
                  className="form-control"
                  placeholder="Service Name"
                  value={form.name}
                  onChange={handleChange}
                  required // Makes the input required
                />
              </div>

              {/* Description Input */}
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

              {/* Price Input */}
              <div className="mb-3">
                <label className="form-label">Price ₹</label>
                <input
                  name="price"
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required // Makes the input required
                />
              </div>
            </div>

            {/* Modal footer with Save and Cancel buttons */}
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary"> Save</button>
              <button type="button" className="btn btn-secondary" onClick={onCancel}> Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Exporting the component for use in other parts of the app
export default AddServiceForm;
