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
const express_1 = require("express");
const gemini_service_1 = require("../services/gemini.service");
const router = (0, express_1.Router)();
// Chat endpoint for Voice AI
router.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, resetHistory } = req.body;
        if (resetHistory) {
            gemini_service_1.geminiService.resetHistory();
            return res.json({ message: 'History reset' });
        }
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const response = yield gemini_service_1.geminiService.chat(message);
        res.json({ response });
    }
    catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to process message' });
    }
}));
exports.default = router;
