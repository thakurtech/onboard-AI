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
exports.interviewerService = exports.InterviewerService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
class InterviewerService {
    constructor() {
        this.conversationHistory = [];
        this.domain = '';
        this.techStack = [];
    }
    startInterview(domain, techStack) {
        return __awaiter(this, void 0, void 0, function* () {
            this.domain = domain;
            this.techStack = techStack;
            const prompt = `You are an expert technical interviewer for a ${domain} position. 
The candidate should know: ${techStack.join(', ')}.

Start the interview with a warm greeting and ask the first technical question about ${techStack[0]}.
Keep questions concise and conversational. Make it feel like a real interview.`;
            try {
                const result = yield model.generateContent(prompt);
                const response = result.response.text();
                this.conversationHistory.push({ role: 'model', parts: response });
                return response;
            }
            catch (error) {
                console.error('Interview start error:', error);
                throw error;
            }
        });
    }
    processAnswer(userAnswer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.conversationHistory.push({ role: 'user', parts: userAnswer });
            const prompt = `As an expert ${this.domain} interviewer, the candidate just answered:
"${userAnswer}"

Based on their answer:
1. Provide brief feedback (1-2 sentences)
2. Ask a relevant follow-up question or move to the next topic from: ${this.techStack.join(', ')}

Keep it conversational and encouraging. Total response should be 2-3 sentences max.`;
            try {
                const chat = model.startChat({
                    history: this.conversationHistory.map(msg => ({
                        role: msg.role,
                        parts: [{ text: msg.parts }],
                    })),
                });
                const result = yield chat.sendMessage(prompt);
                const response = result.response.text();
                this.conversationHistory.push({ role: 'model', parts: response });
                return response;
            }
            catch (error) {
                console.error('Interview process error:', error);
                throw error;
            }
        });
    }
    concludeInterview() {
        return __awaiter(this, void 0, void 0, function* () {
            const prompt = `Based on this interview conversation, provide a JSON response with:
{
  "feedback": "Overall assessment (2-3 sentences)",
  "score": <number 1-10>,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["area 1", "area 2"]
}`;
            try {
                const result = yield model.generateContent(prompt);
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
            }
            catch (error) {
                console.error('Interview conclusion error:', error);
                throw error;
            }
        });
    }
    resetInterview() {
        this.conversationHistory = [];
        this.domain = '';
        this.techStack = [];
    }
}
exports.InterviewerService = InterviewerService;
exports.interviewerService = new InterviewerService();
