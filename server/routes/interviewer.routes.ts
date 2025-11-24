import { Router } from 'express';
import { interviewerService } from '../services/interviewer.service';

const router = Router();

// Start interview
router.post('/start', async (req, res) => {
    try {
        console.log('\n🎤 START INTERVIEW REQUEST');
        console.log('Body:', req.body);

        const { domain, techStack } = req.body;

        if (!domain || !techStack || techStack.length === 0) {
            console.log('❌ Missing domain or tech stack');
            return res.status(400).json({ error: 'Domain and tech stack required' });
        }

        console.log('✅ Starting interview with interviewer service...');
        const greeting = await interviewerService.startInterview(domain, techStack);
        console.log('✅ Interview started successfully');
        console.log('Sending response:', greeting.substring(0, 100) + '...');

        res.json({ greeting });
    } catch (error) {
        console.error('❌ START ERROR:', error);
        res.status(500).json({ error: 'Failed to start interview: ' + (error as Error).message });
    }
});

// Process answer
router.post('/answer', async (req, res) => {
    try {
        console.log('\n💬 PROCESSING ANSWER REQUEST');
        const { answer } = req.body;

        if (!answer) {
            console.log('❌ Missing answer');
            return res.status(400).json({ error: 'Answer required' });
        }

        console.log('✅ Processing answer with interviewer service...');
        const response = await interviewerService.processAnswer(answer);
        console.log('✅ Answer processed successfully');

        res.json({ response });
    } catch (error) {
        console.error('❌ ANSWER ERROR:', error);
        res.status(500).json({ error: 'Failed to process answer: ' + (error as Error).message });
    }
});

// Conclude interview
router.post('/conclude', async (req, res) => {
    try {
        console.log('\n🏁 CONCLUDING INTERVIEW');
        const result = await interviewerService.concludeInterview();
        console.log('✅ Interview concluded');
        res.json(result);
    } catch (error) {
        console.error('❌ CONCLUDE ERROR:', error);
        res.status(500).json({ error: 'Failed to conclude interview: ' + (error as Error).message });
    }
});

// Reset interview
router.post('/reset', (req, res) => {
    console.log('\n🔄 RESETTING INTERVIEW');
    interviewerService.resetInterview();
    res.json({ message: 'Interview reset' });
});

export default router;
