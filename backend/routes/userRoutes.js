const express = require("express");
const router = express.Router();

// Import controller functions for user
const { createUser, getUserById } = require("../controllers/userController");

// @route   POST /users
// @desc    Create a new user (mostly used for internal/admin cases)
// @access  Public or Admin based on auth logic
router.post("/", createUser);

// @route   GET /users/:id
// @desc    Get a specific user by ID
// @access  Public or Authenticated User
router.get("/:id", getUserById);

// Export the router
module.exports = router;
