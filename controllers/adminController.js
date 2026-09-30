const mongoose = require('mongoose');
const User = require('../models/User');
const Location = require('../models/Location');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.json({ count: users.length, users });
  } catch (err) {
    next(err);
  }
};

exports.setUserStatus = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: !!req.body.isActive },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Location.deleteMany({ user: user._id });
    res.json({ message: 'User and their locations deleted' });
  } catch (err) {
    next(err);
  }
};

exports.systemHealth = (req, res) =>
  res.json({
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    weatherService: process.env.OPENWEATHER_API_KEY ? 'live' : 'fallback',
    aiService: process.env.GEMINI_API_KEY ? 'live' : 'fallback',
  });
