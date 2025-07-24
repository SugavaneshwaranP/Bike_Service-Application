const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Create new booking
router.post("/", bookingController.createBooking);

// Get all bookings (admin)
router.get("/", bookingController.getAllBookings);

// Get bookings for a specific customer
router.get("/user/:customerId", bookingController.getBookingsByCustomer);

// Update booking status (admin use)
router.put("/:id/status", bookingController.updateStatus);

module.exports = router;
