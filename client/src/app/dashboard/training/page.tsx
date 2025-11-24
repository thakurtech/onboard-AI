import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CourseBuilder } from '@/components/training/CourseBuilder';

export default function TrainingPage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        AI Course Builder
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Create comprehensive training courses with AI-powered lesson generation
                    </p>
                </div>

                <CourseBuilder />
            </div>
        </DashboardLayout>
    );
}
