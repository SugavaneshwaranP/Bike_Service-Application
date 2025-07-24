const Service = require("../models/Service");

exports.createService = async (req, res) => {
  try {
    const svc = new Service({
      serviceName: req.body.serviceName,
      description: req.body.description,
      price: req.body.price,
      ownerId: req.body.ownerId,
    });

    await svc.save();
    res.json(svc);
  } catch (err) {
    console.error("Error creating service:", err);
    res.status(500).json({ error: "Failed to create service" });
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
