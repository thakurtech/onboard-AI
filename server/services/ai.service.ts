// Mock AI Service for MVP
export const generateOnboardingPlan = async (text: string) => {
    // In a real app, this would call OpenAI/Anthropic API
    console.log('Generating plan from text length:', text.length);

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
};
