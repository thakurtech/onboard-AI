import { Router } from 'express';
import { generateCourse } from '../controllers/course.controller';

const router = Router();

router.post('/generate', generateCourse);

export default router;
