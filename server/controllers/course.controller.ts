import { Request, Response } from 'express';
import { geminiService } from '../services/gemini.service';

export const generateCourse = async (req: Request, res: Response) => {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }

        // Use real Gemini AI
        const course = await geminiService.generateCourse(topic);
        res.json(course);
    } catch (error) {
        console.error('Course generation error:', error);
        res.status(500).json({ message: 'Failed to generate course' });
    }
};
