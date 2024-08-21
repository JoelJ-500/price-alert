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

