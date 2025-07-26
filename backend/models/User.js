const mongoose = require("mongoose");

//  Define User schema
const userSchema = new mongoose.Schema({
  // Full name of the user
  name: {
    type: String,
    required: true,
    trim: true
  },

  // Email address (can add unique: true if needed)
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },

  // Password (should be hashed in production)
  password: {
    type: String,
    required: true
  },

  // Mobile number
  mobile: {
    type: String,
    required: true,
    trim: true
  },

  // Role can be either CUSTOMER or ADMIN
  role: {
    type: String,
    enum: ["CUSTOMER", "ADMIN"],
    default: "CUSTOMER",
    required: true
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
