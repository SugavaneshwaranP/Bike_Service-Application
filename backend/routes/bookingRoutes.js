const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingsByCustomer,
  updateStatus
} = require("../controllers/bookingController");
const router = express.Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/customer/:customerId", getBookingsByCustomer);
router.put("/:id/status", updateStatus);

module.exports = router;
