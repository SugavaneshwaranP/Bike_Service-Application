const User = require("../models/User");

//  Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, mobile, role } = req.body;

    // Create and save user
    const user = new User({ name, email, mobile, role });
    await user.save();

    res.status(201).json(user); // 201 Created
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ error: "Failed to create user" });
  }
};

//  Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
