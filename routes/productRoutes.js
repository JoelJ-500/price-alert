const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product
router.post('/add', async (req, res) => {
  const { name, originalPrice, currentPrice, domLocation, productLink } = req.body;
  try {
    const product = new Product({ name, originalPrice, currentPrice, domLocation, productLink });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
