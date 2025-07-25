const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: String,
  price: Number,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
