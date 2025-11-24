// Quick Gemini API Test
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

async function testGemini() {
    console.log('Testing Gemini API...');
    console.log('API Key present:', !!process.env.GEMINI_API_KEY);
    console.log('API Key (first 10 chars):', process.env.GEMINI_API_KEY?.substring(0, 10));

    try {
        const result = await model.generateContent('Say "Hello! I am working!" in one sentence.');
        const response = result.response.text();
        console.log('✅ Gemini Response:', response);
        console.log('\n✅ GEMINI API IS WORKING!');
    } catch (error: any) {
        console.error('❌ Gemini API Error:', error);
        console.error('Error details:', {
            message: error.message,
            status: error.status,
            statusText: error.statusText
        });
    }
}

testGemini();
