import { Router } from 'express';
import { getVideo, updateProgress, deleteVideo } from '../controllers/videoController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { isInstructor } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/:id', authenticate, getVideo);
router.post('/:id/progress', authenticate, updateProgress);
router.delete('/:id', authenticate, isInstructor, deleteVideo);

export default router;
