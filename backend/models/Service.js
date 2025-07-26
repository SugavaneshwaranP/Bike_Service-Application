const mongoose = require('mongoose');

//  Define the Service schema
const ServiceSchema = new mongoose.Schema({
  // Name of the service (e.g., Oil Change, Brake Check)
  serviceName: { 
    type: String, 
    required: true 
  },

  // Optional description about the service
  description: { 
    type: String 
  },

  // Price for the service
  price: { 
    type: Number 
  },

  // Reference to the service owner (Admin/Service Provider)
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

//  Create and export the model
const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
