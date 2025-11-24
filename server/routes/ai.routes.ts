import { Router } from 'express';
import { geminiService } from '../services/gemini.service';

const router = Router();

// Chat endpoint for Voice AI
router.post('/chat', async (req, res) => {
    try {
        const { message, resetHistory } = req.body;

        if (resetHistory) {
            geminiService.resetHistory();
            return res.json({ message: 'History reset' });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await geminiService.chat(message);
        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
});

export default router;
