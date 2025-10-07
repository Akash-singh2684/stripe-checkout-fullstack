const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  transactionId: {
    type: String,
    required: true,
  },
  stripeSessionId: String,
  paymentIntentId: String,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
