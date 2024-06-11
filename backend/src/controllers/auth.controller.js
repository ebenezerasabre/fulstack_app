const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const newAuth = await authService.registerUser({ user_id, password });
    res.status(201).json(newAuth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const authRecord = await authService.verifyUser(user_id, password);
    res.status(200).json(authRecord);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
