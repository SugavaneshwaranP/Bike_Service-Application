// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection failed", err));

//  Routes
app.use("/auth", authRoutes); //  mount as /auth
app.use("/services", serviceRoutes);  // CRUD for services
app.use("/bookings", bookingRoutes);  // Bookings logic

//  Root
app.get("/", (req, res) => {
  res.send(" Bike Service App Backend Running!");
});

//  Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
