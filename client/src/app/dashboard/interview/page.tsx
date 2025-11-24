'use client';

import React, { useState } from 'react';
import { VoiceInterviewer } from '@/components/interview/VoiceInterviewer';
import { motion } from 'framer-motion';
import { Mic, Brain, Target, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function InterviewPage() {
    const [showInterviewer, setShowInterviewer] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[128px] animate-pulse delay-700" />
            </div>

            {/* Header */}
            <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                    </Link>
                    <div className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                        AI Voice Interviewer
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Practice Your
                        <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent"> Technical Interview</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Get real-time feedback from our AI interviewer. Practice with voice, improve your answers,
                        and build confidence for your next tech interview.
                    </motion.p>
                </div>

                {/* Interview Options */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {[
                        {
                            title: 'Full Stack Development',
                            icon: Brain,
                            techStack: 'React, Node.js, TypeScript, PostgreSQL',
                            color: 'from-blue-500 to-cyan-500',
                            description: 'Comprehensive full-stack questions covering frontend and backend',
                        },
                        {
                            title: 'Frontend Specialist',
                            icon: Target,
                            techStack: 'React, Next.js, Tailwind CSS, JavaScript',
                            color: 'from-violet-500 to-purple-500',
                            description: 'Deep dive into modern frontend frameworks and best practices',
                        },
                        {
                            title: 'Backend Engineer',
                            icon: Trophy,
                            techStack: 'Node.js, Express, MongoDB, REST APIs',
                            color: 'from-pink-500 to-rose-500',
                            description: 'Server-side architecture, databases, and API design',
                        },
                    ].map((option, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 group cursor-pointer"
                            onClick={() => setShowInterviewer(true)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

                            <div className="relative">
                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <option.icon className="w-10 h-10 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{option.title}</h3>
                                <p className="text-gray-400 mb-4">{option.description}</p>
                                <p className="text-sm text-gray-500 mb-6">Tech Stack: {option.techStack}</p>

                                <Button className="w-full group-hover:scale-105 transition-transform">
                                    <Mic className="mr-2 w-5 h-5" />
                                    Start Interview
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-12 backdrop-blur-sm"
                >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', title: 'Choose Your Track', desc: 'Select the role you\'re interviewing for' },
                            { step: '02', title: 'Answer with Voice', desc: 'Speak your answers naturally using your microphone' },
                            { step: '03', title: 'Get AI Feedback', desc: 'Receive instant feedback and score with improvement tips' },
                        ].map((item, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-6xl font-bold text-white/10 mb-4">{item.step}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </main>

            {showInterviewer && <VoiceInterviewer onClose={() => setShowInterviewer(false)} />}
        </div>
    );
}
