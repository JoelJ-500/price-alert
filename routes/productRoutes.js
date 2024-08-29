const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');

// Add a new product
router.post('/add', async (req, res) => {
  const { userId, productData } = req.body;

  try {
    const product = await Product.create(productData);
    await User.findByIdAndUpdate(userId, { $push: { trackedProducts: product._id } });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

// Update a product's details
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

// Delete a tracked product
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    await Product.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { trackedProducts: id } });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

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

//Use MongoDB sort to fetch product listings with the latest price changes
router.get('/dashboard', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ 'priceHistory.timestamp': -1 })
      .limit(10);

    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
