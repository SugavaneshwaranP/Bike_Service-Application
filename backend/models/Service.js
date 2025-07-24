const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Service", serviceSchema);
