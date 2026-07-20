import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getInstructorCourses
} from '../controllers/courseController.js';
import { addVideo, getCourseVideos } from '../controllers/videoController.js';
import { authenticate, optionalAuth } from '../middleware/authMiddleware.js';
import { isInstructor } from '../middleware/roleMiddleware.js';
import { validate } from '../middleware/validationMiddleware.js';
import { courseSchema, videoSchema } from '../utils/validators.js';

const router = Router();

// Public routes
router.get('/', getAllCourses);
router.get('/instructor/my-courses', authenticate, isInstructor, getInstructorCourses);
router.get('/:id', optionalAuth, getCourseById);
router.get('/:courseId/videos', optionalAuth, getCourseVideos);

// Protected routes (instructors only)
router.post('/', authenticate, isInstructor, validate(courseSchema), createCourse);
router.put('/:id', authenticate, isInstructor, updateCourse);
router.delete('/:id', authenticate, isInstructor, deleteCourse);
router.post('/:courseId/videos', authenticate, isInstructor, validate(videoSchema), addVideo);

export default router;
