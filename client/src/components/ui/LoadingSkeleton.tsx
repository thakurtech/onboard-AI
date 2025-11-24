import React from 'react';
import { motion } from 'framer-motion';

export const LoadingSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/10" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-white/10 rounded w-3/4" />
                            <div className="h-3 bg-white/10 rounded w-1/2" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-white/10 rounded" />
                        <div className="h-3 bg-white/10 rounded w-5/6" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export const DashboardCardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-white/5 rounded-2xl p-6 border border-white/10"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="h-5 bg-white/10 rounded w-32" />
                <div className="w-8 h-8 rounded-lg bg-white/10" />
            </div>
            <div className="h-10 bg-white/10 rounded w-24 mb-2" />
            <div className="h-3 bg-white/10 rounded w-40" />
        </motion.div>
    );
};
