import { Router } from 'express';
import { getMyCourses, checkEnrollment } from '../controllers/enrollmentController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/my-courses', authenticate, getMyCourses);
router.get('/check/:courseId', authenticate, checkEnrollment);

export default router;
