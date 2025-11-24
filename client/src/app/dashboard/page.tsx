import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BarChart, Users, BookOpen, Award, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
    const stats = [
        { name: 'Total Employees', value: '248', icon: Users, color: 'blue' },
        { name: 'Active Courses', value: '12', icon: BookOpen, color: 'violet' },
        { name: 'Completion Rate', value: '87%', icon: TrendingUp, color: 'green' },
        { name: 'Certifications', value: '156', icon: Award, color: 'orange' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Dashboard Overview
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Welcome back! Here's what's happening with your team today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const colors = {
                            blue: 'from-blue-600 to-blue-700',
                            violet: 'from-violet-600 to-violet-700',
                            green: 'from-green-600 to-green-700',
                            orange: 'from-orange-600 to-orange-700',
                        };

                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[stat.color as keyof typeof colors]}`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a
                        href="/dashboard/onboarding"
                        className="block bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-bold mb-2">Create Onboarding Plan</h3>
                        <p className="text-blue-100">Upload documents and generate AI-powered onboarding</p>
                    </a>

                    <a
                        href="/dashboard/training"
                        className="block bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-bold mb-2">Build Training Course</h3>
                        <p className="text-green-100">Create courses with AI lesson generation</p>
                    </a>

                    <a
                        href="/dashboard/interview"
                        className="block bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-xl font-bold mb-2">AI Voice Interview</h3>
                        <p className="text-orange-100">Practice technical interviews with AI</p>
                    </a>
                </div>
            </div>
        </DashboardLayout>
    );
}
