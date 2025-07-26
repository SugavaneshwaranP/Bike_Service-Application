const Service = require('../models/Service');

//  Create a new service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();

    res.status(201).json(service); // Created successfully
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(400).json({ error: err.message }); // Bad Request
  }
};

//  Update an existing service by ID
exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(updated); // Successfully updated
  } catch (err) {
    console.error("Error updating service:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  Get all available services
exports.getAllServices = async (req, res) => {
  try {
    const list = await Service.find();
    res.json(list);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
