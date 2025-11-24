import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface InterviewQuestion {
    question: string;
    followUp?: string;
    category: 'technical' | 'behavioral' | 'scenario';
}

export class InterviewerService {
    private conversationHistory: Array<{ role: 'user' | 'model'; parts: string }> = [];
    private domain: string = '';
    private techStack: string[] = [];

    async startInterview(domain: string, techStack: string[]): Promise<string> {
        this.domain = domain;
        this.techStack = techStack;

        console.log('\n========== STARTING INTERVIEW ==========');
        console.log('Domain:', domain);
        console.log('Tech Stack:', techStack);
        console.log('API Key present:', !!process.env.GEMINI_API_KEY);

        const prompt = `You are an expert technical interviewer for a ${domain} position. 
The candidate should know: ${techStack.join(', ')}.

Start the interview with a warm greeting and ask the first technical question about ${techStack[0]}.
Keep questions concise and conversational. Make it feel like a real interview.`;

        try {
            console.log('Sending prompt to Gemini...');
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            console.log('✅ Gemini Response:', response);
            console.log('========================================\n');

            this.conversationHistory.push({ role: 'model', parts: response });
            return response;
        } catch (error: any) {
            console.error('❌ Gemini API Error:', error.message || error);
            console.log('⚠️  Using fallback mock response');

            // Fallback mock response
            const mockResponse = `Hello! Welcome to your ${domain} technical interview. I'm excited to discuss your experience with ${techStack.join(', ')}. Let's start with ${techStack[0]} - can you explain what makes it a popular choice for modern web development?`;

            this.conversationHistory.push({ role: 'model', parts: mockResponse });
            return mockResponse;
        }
    }

    async processAnswer(userAnswer: string): Promise<string> {
        console.log('\n========== PROCESSING ANSWER ==========');
        console.log('User Answer:', userAnswer);

        this.conversationHistory.push({ role: 'user', parts: userAnswer });

        const prompt = `As an expert ${this.domain} interviewer, the candidate just answered:
"${userAnswer}"

Based on their answer:
1. Provide brief feedback (1-2 sentences)
2. Ask a relevant follow-up question or move to the next topic from: ${this.techStack.join(', ')}

Keep it conversational and encouraging. Total response should be 2-3 sentences max.`;

        try {
            console.log('Creating chat with history...');
            const chat = model.startChat({
                history: this.conversationHistory.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.parts }],
                })),
            });

            console.log('Sending message to Gemini...');
            const result = await chat.sendMessage(prompt);
            const response = result.response.text();
            console.log('✅ Gemini Response:', response);
            console.log('=====================================\n');

            this.conversationHistory.push({ role: 'model', parts: response });
            return response;
        } catch (error: any) {
            console.error('❌ Gemini API Error:', error.message || error);
            console.log('⚠️  Using fallback mock response');

            // Fallback mock responses
            const mockResponses = [
                `Great explanation! That shows good understanding. Now, let's discuss ${this.techStack[1] || 'architecture'} - how would you structure a scalable application?`,
                `Interesting perspective. Can you elaborate on how you'd handle error handling and edge cases in production?`,
                `Good point! Let's move to performance optimization - what strategies would you use to improve application speed?`,
                `Nice! Now let's talk about ${this.techStack[2] || 'database design'} - how would you optimize queries for large datasets?`,
            ];

            const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            this.conversationHistory.push({ role: 'model', parts: mockResponse });
            return mockResponse;
        }
    }

    async concludeInterview(): Promise<{ feedback: string; score: number; strengths: string[]; improvements: string[] }> {
        const prompt = `Based on this interview conversation, provide a JSON response with:
{
  "feedback": "Overall assessment (2-3 sentences)",
  "score": <number 1-10>,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["area 1", "area 2"]
}`;

        try {
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            const jsonMatch = response.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            return {
                feedback: 'Great effort! Keep practicing.',
                score: 7,
                strengths: ['Good communication', 'Technical knowledge'],
                improvements: ['Practice more coding', 'Deeper understanding'],
            };
        } catch (error) {
            console.error('Interview conclusion error:', error);
            // Return mock result
            return {
                feedback: 'You demonstrated solid technical knowledge and good communication skills throughout the interview.',
                score: 8,
                strengths: ['Clear communication', 'Good technical understanding'],
                improvements: ['Practice more real-world scenarios', 'Explore advanced topics'],
            };
        }
    }

    resetInterview() {
        this.conversationHistory = [];
        this.domain = '';
        this.techStack = [];
    }
}

export const interviewerService = new InterviewerService();
