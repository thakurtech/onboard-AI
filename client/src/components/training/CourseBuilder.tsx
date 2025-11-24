'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Plus, Trash2, Sparkles, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

interface Lesson {
    id: string;
    title: string;
    content: string;
    duration: string;
}

interface Course {
    title: string;
    description: string;
    lessons: Lesson[];
}

export const CourseBuilder: React.FC = () => {
    const [course, setCourse] = useState<Course>({
        title: '',
        description: '',
        lessons: [],
    });
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateCourseWithAI = async () => {
        if (!aiPrompt.trim()) {
            toast.error('Please enter a course topic');
            return;
        }

        setIsGenerating(true);
        toast.loading('Generating course with AI...', { id: 'course-gen' });

        try {
            const response = await fetch('http://localhost:5000/api/courses/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: aiPrompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate course');
            }

            const data = await response.json();
            setCourse(data.course);
            toast.success('Course generated successfully!', { id: 'course-gen' });
        } catch (error) {
            console.error('Error generating course:', error);
            toast.error('Failed to generate course', { id: 'course-gen' });
        } finally {
            setIsGenerating(false);
        }
    };

    const addLesson = () => {
        const newLesson: Lesson = {
            id: Date.now().toString(),
            title: 'New Lesson',
            content: '',
            duration: '30 min',
        };
        setCourse({ ...course, lessons: [...course.lessons, newLesson] });
    };

    const updateLesson = (id: string, field: keyof Lesson, value: string) => {
        setCourse({
            ...course,
            lessons: course.lessons.map(lesson =>
                lesson.id === id ? { ...lesson, [field]: value } : lesson
            ),
        });
    };

    const removeLesson = (id: string) => {
        setCourse({
            ...course,
            lessons: course.lessons.filter(lesson => lesson.id !== id),
        });
        toast.success('Lesson removed');
    };

    const saveCourse = () => {
        if (!course.title || course.lessons.length === 0) {
            toast.error('Please add a title and at least one lesson');
            return;
        }

        toast.success('Course saved successfully!');
        console.log('Saving course:', course);
    };

    return (
        <div className="space-y-6">
            {/* AI Course Generator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-600/10 to-violet-600/10 dark:from-blue-600/20 dark:to-violet-600/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"
            >
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        AI Course Generator
                    </h3>
                </div>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Enter course topic (e.g., 'React Hooks for beginners')"
                        className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isGenerating}
                    />
                    <Button
                        onClick={generateCourseWithAI}
                        disabled={isGenerating}
                        isLoading={isGenerating}
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate
                    </Button>
                </div>
            </motion.div>

            {/* Course Title & Description */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Course Title
                        </label>
                        <input
                            type="text"
                            value={course.title}
                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                            placeholder="Enter course title"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Course Description
                        </label>
                        <textarea
                            value={course.description}
                            onChange={(e) => setCourse({ ...course, description: e.target.value })}
                            placeholder="Enter course description"
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Lessons */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        Lessons ({course.lessons.length})
                    </h3>
                    <Button onClick={addLesson}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Lesson
                    </Button>
                </div>

                {course.lessons.map((lesson, index) => (
                    <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                    {index + 1}
                                </span>
                                <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                                    className="font-semibold text-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 text-gray-900 dark:text-white"
                                />
                            </div>
                            <button
                                onClick={() => removeLesson(lesson.id)}
                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    value={lesson.duration}
                                    onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)}
                                    className="w-32 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Content
                                </label>
                                <textarea
                                    value={lesson.content}
                                    onChange={(e) => updateLesson(lesson.id, 'content', e.target.value)}
                                    placeholder="Enter lesson content..."
                                    rows={4}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}

                {course.lessons.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                        <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">No lessons yet. Click "Add Lesson" to get started.</p>
                    </div>
                )}
            </div>

            {/* Save Button */}
            {course.lessons.length > 0 && (
                <div className="flex justify-end">
                    <Button onClick={saveCourse} size="lg">
                        <Save className="w-4 h-4 mr-2" />
                        Save Course
                    </Button>
                </div>
            )}
        </div>
    );
};
