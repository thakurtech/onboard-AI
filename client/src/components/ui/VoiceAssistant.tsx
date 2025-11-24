'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Send } from 'lucide-react';
import { Button } from './Button';
import { processVoiceInput, getVoiceSuggestions } from '@/lib/voiceAI';

interface VoiceAssistantProps {
    onClose?: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
        { role: 'assistant', content: 'Hi! I\'m your AI assistant. How can I help you today?' }
    ]);
    const [isProcessing, setIsProcessing] = useState(false);

    const suggestions = getVoiceSuggestions();

    const handleSend = async (text?: string) => {
        const messageText = text || input;
        if (!messageText.trim() || isProcessing) return;

        setMessages(prev => [...prev, { role: 'user', content: messageText }]);
        setInput('');
        setIsProcessing(true);

        try {
            const response = await processVoiceInput(messageText);
            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleVoiceToggle = () => {
        setIsListening(!isListening);
        // In a real app, this would use Web Speech API
        if (!isListening) {
            setTimeout(() => {
                setIsListening(false);
                setInput('How do I get started?');
            }, 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-violet-600/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                            <Volume2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">AI Assistant</h3>
                            <p className="text-sm text-gray-400">Powered by Onboard AI</p>
                        </div>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    )}
                </div>

                {/* Messages */}
                <div className="h-96 overflow-y-auto p-6 space-y-4">
                    <AnimatePresence>
                        {messages.map((message, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-4 rounded-2xl ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                                            : 'bg-white/5 border border-white/10 text-gray-200'
                                        }`}
                                >
                                    {message.content}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                <div className="flex gap-2">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                    <div className="px-6 pb-4">
                        <p className="text-sm text-gray-400 mb-3">Quick questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(suggestion)}
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:border-blue-500/50 transition-all"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input */}
                <div className="p-6 border-t border-white/10 bg-black/40">
                    <div className="flex gap-3">
                        <button
                            onClick={handleVoiceToggle}
                            className={`p-4 rounded-xl transition-all ${isListening
                                    ? 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse'
                                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                                }`}
                        >
                            {isListening ? (
                                <MicOff className="w-5 h-5 text-white" />
                            ) : (
                                <Mic className="w-5 h-5 text-gray-400" />
                            )}
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message or use voice..."
                            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        <Button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isProcessing}
                            className="px-6"
                        >
                            <Send className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
