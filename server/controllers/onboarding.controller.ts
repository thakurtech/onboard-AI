import { Request, Response } from 'express';
import multer from 'multer';
const pdf = require('pdf-parse');
import { geminiService } from '../services/gemini.service';

// Configure Multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const uploadFile = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const dataBuffer = req.file.buffer;
        const data = await pdf(dataBuffer);

        res.json({
            message: 'File uploaded and processed successfully',
            textSummary: data.text.substring(0, 200) + '...',
            fullText: data.text,
            fullTextLength: data.text.length,
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed' });
    }
};

export const generatePlan = async (req: Request, res: Response) => {
    try {
        const { text, role } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text content is required' });
        }

        // Use real Gemini AI
        const plan = await geminiService.generateOnboardingPlan(text, role || 'employee');
        res.json(plan);
    } catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ message: 'Plan generation failed' });
    }
};
