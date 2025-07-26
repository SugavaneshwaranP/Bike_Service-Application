const express = require("express");
const router = express.Router();

// Import service controller functions
const {
  createService,
  updateService,
  deleteService,
  getAllServices,
} = require("../controllers/serviceController");


// @route   POST /services
// @desc    Create a new service
// @access  Public or Admin (based on implementation)
// ===============================
router.post("/", createService);

// ===============================
// @route   GET /services
// @desc    Get all services
// @access  Public
// ===============================
router.get("/", getAllServices);

// ===============================
// @route   PUT /services/:id
// @desc    Update a specific service by ID
// @access  Admin
// ===============================
router.put("/:id", updateService);

// ===============================
// @route   DELETE /services/:id
// @desc    Delete a specific service by ID
// @access  Admin
// ===============================
router.delete("/:id", deleteService);

// Export the router
module.exports = router;
