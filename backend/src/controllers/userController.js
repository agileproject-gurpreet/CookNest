const service = require("../services/userService"); // 👈 ADD THIS

exports.register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const user = await service.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("REGISTER ERROR FULL:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await service.login(req.body);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json(user);
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
