import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileUploader } from '@/components/onboarding/FileUploader';

export default function OnboardingPage() {
    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        AI Onboarding Generator
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Upload your company documents and let AI create a personalized onboarding plan
                    </p>
                </div>

                <FileUploader />
            </div>
        </DashboardLayout>
    );
}
