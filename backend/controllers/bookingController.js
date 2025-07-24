const Booking = require("../models/Booking");
const User = require("../models/User");
const Service = require("../models/Service");
const { sendMail } = require("../utils/sendMail");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, serviceIds, bookingDate } = req.body;

    const customer = await User.findById(customerId);
    if (!customer) return res.status(404).json({ error: "Customer not found" });

    const services = await Service.find({ _id: { $in: serviceIds } });

    const booking = new Booking({
      customer,
      services,
      bookingDate,
    });

    await booking.save();

    // Send notification to admin
    await sendMail(
      "admin@bikeservice.com",
      "📥 New Booking Received",
      `Booking from ${customer.email} on ${bookingDate}`
    );

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("customer services");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get bookings by customer
exports.getBookingsByCustomer = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.params.customerId }).populate("services");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's bookings" });
  }
};

// Update booking status
exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("customer");
    booking.status = req.body.status;
    await booking.save();

    if (booking.status === "READY") {
      await sendMail(
        booking.customer.email,
        "🛵 Your Bike is Ready!",
        `Hi ${booking.customer.name}, your booking (ID: ${booking._id}) is ready for pickup.`
      );
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
