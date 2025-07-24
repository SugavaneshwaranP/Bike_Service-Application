const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { name, email, mobile, role } = req.body;
  const user = new User({ name, email, mobile, role });
  await user.save();
  res.json(user);
};

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};
