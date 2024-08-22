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

// Handle product data scraped from web spider
router.post('/update', async (req, res) => {
  const { product_name, price, url } = req.body;
  try {
    const product = await Product.findOne({ productLink: url });
    if (product) {
      product.currentPrice = price;
      product.priceHistory.push({ price });
      await product.save();
      res.json({ msg: 'Product updated' });
    } else {
      res.status(404).json({ msg: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Adjust the price history based on the tracking interval when sending data to the frontend
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('usersTracking.userId');
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Filter price history based on the user's tracking start and interval
    const userTracking = product.usersTracking.find(u => u.userId._id.equals(req.user.id));
    const relevantHistory = product.priceHistory.filter(p => 
      p.timestamp >= userTracking.trackingStart && 
      p.timestamp % userTracking.trackingInterval === 0
    );

    res.json({ product, relevantHistory });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


