const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  usersTracking: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      trackingStart: Date,
      trackingInterval: Number, // in hours
    }
  ],
  priceHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      price: Number
    }
  ],
  domLocation: { type: String, required: true },
  productLink: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);