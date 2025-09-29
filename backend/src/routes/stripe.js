import express from 'express';

const router = express.Router();

// Placeholder for Stripe routes
router.post('/create-checkout-session', async (req, res) => {
  res.json({ message: 'Stripe integration coming soon' });
});

router.post('/webhook', async (req, res) => {
  res.json({ received: true });
});

export default router;
