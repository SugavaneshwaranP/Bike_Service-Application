const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  bookingDate: Date,
  status: { type: String, enum: ['PENDING', 'READY', 'COMPLETED'], default: 'PENDING' }
});
module.exports = mongoose.model("Booking", bookingSchema);
