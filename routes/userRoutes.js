const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password: await bcrypt.hash(password, 10), email });
    await user.save();
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: 3600 }); //NOTE CHANGE
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

// Edit user settings/preferences for time intervals
router.post('/settings', async (req, res) => {
  const { updateInterval } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.updateInterval = updateInterval;
    await user.save();
    res.json({ msg: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

