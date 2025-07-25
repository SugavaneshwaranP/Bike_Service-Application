const Service = require('../models/Service');

exports.createService = async (req, res) => {
  console.log("Received service payload:", req.body); // Add this

  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(400).json({ error: err.message });
  }
};



exports.updateService = async (req, res) => {
  const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};

exports.getAllServices = async (req, res) => {
  const list = await Service.find();
  res.json(list);
};
