import { Router } from 'express';
import authRoutes from './authRoutes.js';
import courseRoutes from './courseRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import enrollmentRoutes from './enrollmentRoutes.js';
import videoRoutes from './videoRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/courses', courseRoutes);
router.use('/payments', paymentRoutes);
router.use('/enrollments', enrollmentRoutes);
router.use('/videos', videoRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
