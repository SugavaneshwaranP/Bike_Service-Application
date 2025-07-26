const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// POST /auth/register
// Register a new user (Customer or Admin)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    //  Check if the user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //  Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      role: role || "CUSTOMER", // Default role if not provided
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// POST /auth/login
// Authenticate user and return JWT token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    //  Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //  Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "mysecretkey", // Use env secret
      { expiresIn: "1d" }
    );

    // Return user data and token
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
