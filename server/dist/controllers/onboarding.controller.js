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
exports.generatePlan = exports.uploadFile = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const pdf = require('pdf-parse');
const gemini_service_1 = require("../services/gemini.service");
// Configure Multer for memory storage
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const dataBuffer = req.file.buffer;
        const data = yield pdf(dataBuffer);
        res.json({
            message: 'File uploaded and processed successfully',
            textSummary: data.text.substring(0, 200) + '...',
            fullText: data.text,
            fullTextLength: data.text.length,
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed' });
    }
});
exports.uploadFile = uploadFile;
const generatePlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, role } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text content is required' });
        }
        // Use real Gemini AI
        const plan = yield gemini_service_1.geminiService.generateOnboardingPlan(text, role || 'employee');
        res.json(plan);
    }
    catch (error) {
        console.error('Generation error:', error);
        res.status(500).json({ message: 'Plan generation failed' });
    }
});
exports.generatePlan = generatePlan;
