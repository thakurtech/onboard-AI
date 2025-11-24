'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

export const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [onboardingPlan, setOnboardingPlan] = useState<any>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];

        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a PDF, DOC, DOCX, or TXT file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error('File size must be less than 10MB');
            return;
        }

        setFile(file);
        toast.success(`File "${file.name}" selected`);
    };

    const generateOnboardingPlan = async () => {
        if (!file) {
            toast.error('Please select a file first');
            return;
        }

        setIsProcessing(true);
        toast.loading('Uploading and analyzing document...', { id: 'onboarding' });

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:5000/api/onboarding/generate', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to generate onboarding plan');
            }

            const data = await response.json();
            setOnboardingPlan(data.plan);
            toast.success('Onboarding plan generated successfully!', { id: 'onboarding' });
        } catch (error) {
            console.error('Error generating plan:', error);
            toast.error('Failed to generate onboarding plan', { id: 'onboarding' });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
            >
                <div
                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${dragActive
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx,.txt"
                    />

                    {file ? (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">{file.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            <div className="flex justify-center gap-3">
                                <Button onClick={() => setFile(null)} variant="outline">
                                    Remove
                                </Button>
                                <Button
                                    onClick={generateOnboardingPlan}
                                    disabled={isProcessing}
                                    isLoading={isProcessing}
                                >
                                    {isProcessing ? 'Processing...' : 'Generate Plan'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <label htmlFor="file-upload" className="cursor-pointer">
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
                                        Click to upload
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
                                </label>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    PDF, DOC, DOCX or TXT (Max 10MB)
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Generated Plan */}
            {onboardingPlan && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Generated Onboarding Plan
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {onboardingPlan.overview && (
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Overview</h4>
                                <p className="text-gray-700 dark:text-gray-300">{onboardingPlan.overview}</p>
                            </div>
                        )}

                        {onboardingPlan.phases && onboardingPlan.phases.length > 0 && (
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Phases</h4>
                                <div className="space-y-3">
                                    {onboardingPlan.phases.map((phase: any, idx: number) => (
                                        <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                                                Phase {idx + 1}: {phase.title}
                                            </h5>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {phase.description}
                                            </p>
                                            {phase.tasks && phase.tasks.length > 0 && (
                                                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                                    {phase.tasks.map((task: string, taskIdx: number) => (
                                                        <li key={taskIdx}>{task}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {onboardingPlan.timeline && (
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Timeline</h4>
                                <p className="text-gray-700 dark:text-gray-300">{onboardingPlan.timeline}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button onClick={() => window.print()}>
                            Download PDF
                        </Button>
                        <Button variant="outline" onClick={() => setOnboardingPlan(null)}>
                            Generate New Plan
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
