import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

export class GeminiService {
    private chatHistory: ChatMessage[] = [];

    async chat(userMessage: string): Promise<string> {
        try {
            const chat = model.startChat({
                history: this.chatHistory.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.parts }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                },
            });

            const result = await chat.sendMessage(userMessage);
            const response = result.response.text();

            // Update history
            this.chatHistory.push({ role: 'user', parts: userMessage });
            this.chatHistory.push({ role: 'model', parts: response });

            return response;
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw new Error('Failed to get AI response');
        }
    }

    async generateOnboardingPlan(documentText: string, role: string = 'employee'): Promise<any> {
        const prompt = `You are an expert HR onboarding specialist. Based on the following company document, create a structured 7-day onboarding plan for a new ${role}.

Document Content:
${documentText.substring(0, 3000)}

Generate a JSON response with this exact structure:
{
  "title": "Onboarding Plan for [Role]",
  "summary": "Brief overview",
  "modules": [
    {
      "title": "Day 1: [Title]",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    }
  ]
}

Make it specific, actionable, and role-appropriate.`;

        try {
            const result = await model.generateContent(prompt);
            const response = result.response.text();

            // Parse JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            // Fallback if no JSON found
            return {
                title: `Onboarding Plan for ${role}`,
                summary: 'AI-generated onboarding based on your documents',
                modules: [
                    {
                        title: 'Day 1: Welcome & Orientation',
                        tasks: ['Complete HR paperwork', 'IT setup', 'Team introduction'],
                    },
                ],
            };
        } catch (error) {
            console.error('Onboarding generation error:', error);
            throw error;
        }
    }

    async generateCourse(topic: string): Promise<any> {
        const prompt = `You are an expert instructional designer. Create a comprehensive training course about "${topic}".

Generate a JSON response with this exact structure:
{
  "title": "Mastering ${topic}",
  "description": "Brief course description",
  "modules": [
    {
      "title": "Module 1: [Title]",
      "videoUrl": "https://assets.mixkit.co/videos/preview/mixkit-businesswoman-working-on-a-laptop-in-an-office-232-large.mp4",
      "lessons": [
        {"title": "Lesson title", "duration": "5:00"}
      ],
      "quiz": {
        "question": "Question text",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": 0
      }
    }
  ]
}

Make it practical with 2-3 modules, real lessons, and challenging quizzes.`;

        try {
            const result = await model.generateContent(prompt);
            const response = result.response.text();

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            throw new Error('No valid JSON in response');
        } catch (error) {
            console.error('Course generation error:', error);
            throw error;
        }
    }

    resetHistory() {
        this.chatHistory = [];
    }
}

export const geminiService = new GeminiService();
