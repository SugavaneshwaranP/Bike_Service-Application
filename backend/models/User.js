const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String,
  
  role: {
  type: String,
  enum: ["CUSTOMER", "ADMIN"],
  default: "CUSTOMER",
  required: true,
}

});

module.exports = mongoose.model("User", userSchema);
