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
const interviewer_service_1 = require("../services/interviewer.service");
const router = (0, express_1.Router)();
// Start interview
router.post('/start', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { domain, techStack } = req.body;
        if (!domain || !techStack || techStack.length === 0) {
            return res.status(400).json({ error: 'Domain and tech stack required' });
        }
        const greeting = yield interviewer_service_1.interviewerService.startInterview(domain, techStack);
        res.json({ greeting });
    }
    catch (error) {
        console.error('Start interview error:', error);
        res.status(500).json({ error: 'Failed to start interview' });
    }
}));
// Process answer
router.post('/answer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer } = req.body;
        if (!answer) {
            return res.status(400).json({ error: 'Answer required' });
        }
        const response = yield interviewer_service_1.interviewerService.processAnswer(answer);
        res.json({ response });
    }
    catch (error) {
        console.error('Process answer error:', error);
        res.status(500).json({ error: 'Failed to process answer' });
    }
}));
// Conclude interview
router.post('/conclude', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield interviewer_service_1.interviewerService.concludeInterview();
        res.json(result);
    }
    catch (error) {
        console.error('Conclude interview error:', error);
        res.status(500).json({ error: 'Failed to conclude interview' });
    }
}));
// Reset interview
router.post('/reset', (req, res) => {
    interviewer_service_1.interviewerService.resetInterview();
    res.json({ message: 'Interview reset' });
});
exports.default = router;
