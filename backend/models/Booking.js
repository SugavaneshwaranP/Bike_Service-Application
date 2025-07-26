const mongoose = require("mongoose");

//  Booking Schema Definition
const bookingSchema = new mongoose.Schema({
  // Reference to the customer who made the booking
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Array of selected service IDs
  services: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service',
    required: true 
  }],

  // Date the booking was scheduled for
  bookingDate: { 
    type: Date, 
    required: true 
  },

  // Current status of the booking
  status: { 
    type: String, 
    enum: ['PENDING', 'READY', 'COMPLETED'], 
    default: 'PENDING' 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

//  Export the Booking model
module.exports = mongoose.model("Booking", bookingSchema);
