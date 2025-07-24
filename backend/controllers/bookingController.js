const Booking = require("../models/Booking");
const User = require("../models/User");
const Service = require("../models/Service");
const { sendMail } = require("../utils/sendMail");

exports.createBooking = async (req, res) => {
  const { customerId, serviceIds, bookingDate } = req.body;
  const customer = await User.findById(customerId);
  if (!customer) return res.status(404).json({ error: "Customer not found" });

  const services = await Service.find({ _id: { $in: serviceIds } });
  const booking = new Booking({ customer, services, bookingDate });
  await booking.save();

  await sendMail(
    "admin@bikeservice.com",
    "🚨 New Booking Received!",
    `Booking from ${customer.email} on ${bookingDate}`
  );

  res.json(booking);
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("customer services");
  res.json(bookings);
};

exports.getBookingsByCustomer = async (req, res) => {
  const bookings = await Booking.find({ customer: req.params.customerId }).populate("services");
  res.json(bookings);
};

exports.updateStatus = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate("customer");
  booking.status = req.body.status;
  await booking.save();

  if (booking.status === "READY") {
    await sendMail(
      booking.customer.email,
      "🛵 Your Bike Service is Ready!",
      `Hi ${booking.customer.name}, your booking (ID: ${booking._id}) is ready`
    );
  }

  res.json(booking);
};  
