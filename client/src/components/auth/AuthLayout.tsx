import React from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                <div className="mb-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl font-bold text-white mb-2 tracking-tight"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};
