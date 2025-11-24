"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiService = exports.GeminiService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
class GeminiService {
    constructor() {
        this.chatHistory = [];
    }
    chat(userMessage) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield chat.sendMessage(userMessage);
                const response = result.response.text();
                // Update history
                this.chatHistory.push({ role: 'user', parts: userMessage });
                this.chatHistory.push({ role: 'model', parts: response });
                return response;
            }
            catch (error) {
                console.error('Gemini API Error:', error);
                throw new Error('Failed to get AI response');
            }
        });
    }
    generateOnboardingPlan(documentText_1) {
        return __awaiter(this, arguments, void 0, function* (documentText, role = 'employee') {
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
                const result = yield model.generateContent(prompt);
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
            }
            catch (error) {
                console.error('Onboarding generation error:', error);
                throw error;
            }
        });
    }
    generateCourse(topic) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield model.generateContent(prompt);
                const response = result.response.text();
                const jsonMatch = response.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    return JSON.parse(jsonMatch[0]);
                }
                throw new Error('No valid JSON in response');
            }
            catch (error) {
                console.error('Course generation error:', error);
                throw error;
            }
        });
    }
    resetHistory() {
        this.chatHistory = [];
    }
}
exports.GeminiService = GeminiService;
exports.geminiService = new GeminiService();
