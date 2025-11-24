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
exports.generateOnboardingPlan = void 0;
// Mock AI Service for MVP
const generateOnboardingPlan = (text) => __awaiter(void 0, void 0, void 0, function* () {
    // In a real app, this would call OpenAI/Anthropic API
    console.log('Generating plan from text length:', text.length);
    // Simulate AI delay
    yield new Promise((resolve) => setTimeout(resolve, 2000));
    return {
        title: 'Generated Onboarding Plan',
        summary: 'Based on the uploaded documents, here is a structured onboarding flow.',
        modules: [
            {
                title: 'Day 1: Company Overview',
                tasks: ['Read Employee Handbook', 'Setup IT Accounts', 'Meet the Team'],
            },
            {
                title: 'Day 2: Role Specifics',
                tasks: ['Review Technical Documentation', 'Setup Development Environment', 'First Code Commit'],
            },
            {
                title: 'Week 1: Project Deep Dive',
                tasks: ['Understand Core Architecture', 'Pair Programming Session', 'Attend Sprint Planning'],
            },
        ],
    };
});
exports.generateOnboardingPlan = generateOnboardingPlan;
