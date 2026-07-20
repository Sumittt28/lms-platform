import { Router } from 'express';
import express from 'express';
import { createCheckout, handleWebhook, verifyPayment } from '../controllers/paymentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/create-checkout', authenticate, createCheckout);
router.get('/verify/:sessionId', authenticate, verifyPayment);

// Webhook needs raw body for signature verification
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
