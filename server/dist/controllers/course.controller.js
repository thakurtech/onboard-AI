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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCourse = void 0;
const gemini_service_1 = require("../services/gemini.service");
const generateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required' });
        }
        // Use real Gemini AI
        const course = yield gemini_service_1.geminiService.generateCourse(topic);
        res.json(course);
    }
    catch (error) {
        console.error('Course generation error:', error);
        res.status(500).json({ message: 'Failed to generate course' });
    }
});
exports.generateCourse = generateCourse;
