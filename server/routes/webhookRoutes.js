const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Update order status to success
        const successOrder = await Order.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            paymentStatus: 'success',
            paymentIntentId: session.payment_intent,
          },
          { new: true }
        );

        if (successOrder) {
          console.log('Order payment successful:', successOrder._id);
        } else {
          console.log('Order not found for session:', session.id);
        }
        break;

      case 'payment_intent.payment_failed':
        const paymentIntent = event.data.object;
        
        // Update order status to failed
        const failedOrder = await Order.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { paymentStatus: 'failed' },
          { new: true }
        );

        if (failedOrder) {
          console.log('Order payment failed:', failedOrder._id);
        } else {
          console.log('Order not found for payment intent:', paymentIntent.id);
        }
        break;

      case 'checkout.session.async_payment_failed':
        const failedSession = event.data.object;
        
        await Order.findOneAndUpdate(
          { stripeSessionId: failedSession.id },
          { paymentStatus: 'failed' },
          { new: true }
        );
        
        console.log('Checkout session payment failed:', failedSession.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Get order by session ID (for success page)
router.get('/order/:sessionId', async (req, res) => {
  try {
    const order = await Order.findOne({ stripeSessionId: req.params.sessionId });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (for admin/testing purposes)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
