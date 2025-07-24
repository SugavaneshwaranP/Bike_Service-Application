const Service = require("../models/Service");

exports.createService = async (req, res) => {
  const svc = new Service(req.body);
  await svc.save();
  res.json(svc);
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
