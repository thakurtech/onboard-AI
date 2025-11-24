import { Router } from 'express';
import { upload, uploadFile, generatePlan } from '../controllers/onboarding.controller';

const router = Router();

router.post('/upload', upload.single('file'), uploadFile);
router.post('/generate', generatePlan);

export default router;
