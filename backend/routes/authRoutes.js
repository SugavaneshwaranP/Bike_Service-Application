const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// @route   POST /auth/register
// @desc    Register new user (Customer or Admin)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile, role } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      role: role || "CUSTOMER",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("Registration error", err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// @route   POST /auth/login
// @desc    Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
   const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET || "mysecretkey", // ✅ Add secret key here
  { expiresIn: "1d" }
);


    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });

  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
