const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' }
});
module.exports = mongoose.model("User", userSchema);
