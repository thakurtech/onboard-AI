// Voice AI Service using real Gemini API backend
export interface VoiceMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export const processVoiceInput = async (input: string): Promise<string> => {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_URL}/api/ai/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
            throw new Error('AI API request failed');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Voice AI Error:', error);
        return `I'm having trouble connecting to the AI service. Please make sure the backend is running with your Gemini API key configured.`;
    }
};

export const resetVoiceHistory = async (): Promise<void> => {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        await fetch(`${API_URL}/api/ai/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resetHistory: true }),
        });
    } catch (error) {
        console.error('Failed to reset history:', error);
    }
};

export const getVoiceSuggestions = (): string[] => {
    return [
        'How do I get started with Onboard AI?',
        'What features do you offer for employee training?',
        'Tell me about your pricing plans',
        'How does the AI onboarding generator work?',
    ];
};
