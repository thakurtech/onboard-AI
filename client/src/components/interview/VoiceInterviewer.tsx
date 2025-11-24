'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Sparkles, Award, TrendingUp, Settings } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

interface VoiceInterviewerProps {
    onClose: () => void;
}

export const VoiceInterviewer: React.FC<VoiceInterviewerProps> = ({ onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [messages, setMessages] = useState<Array<{ role: 'interviewer' | 'candidate'; text: string }>>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [showVoiceSettings, setShowVoiceSettings] = useState(false);

    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);

            // Auto-select best voice
            const preferredVoice = voices.find(voice =>
                voice.name.includes('Google') && voice.lang.startsWith('en')
            ) || voices.find(voice =>
                voice.name.includes('Natural') || voice.name.includes('Enhanced')
            ) || voices.find(voice => voice.lang.startsWith('en-US'))
                || voices[0];

            setSelectedVoice(preferredVoice);
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setTranscript(transcript);
                handleAnswer(transcript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                toast.error('Voice recognition error. Please try again.');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            window.speechSynthesis.cancel();
        };
    }, []);

    const speakText = (text: string) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.1;
        utterance.volume = 1;

        synthRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const startInterview = async () => {
        setIsProcessing(true);
        toast.loading('Starting your interview...', { id: 'interview' });

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/interviewer/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domain: 'Full Stack Development',
                    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
                }),
            });

            const data = await res.json();
            setMessages([{ role: 'interviewer', text: data.greeting }]);
            setInterviewStarted(true);
            speakText(data.greeting);
            toast.success('Interview started! Listen and respond.', { id: 'interview' });
        } catch (error) {
            toast.error('Failed to start interview', { id: 'interview' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleAnswer = async (answer: string) => {
        setMessages(prev => [...prev, { role: 'candidate', text: answer }]);
        setIsProcessing(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/interviewer/answer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answer }),
            });

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'interviewer', text: data.response }]);
            speakText(data.response);
        } catch (error) {
            toast.error('Failed to process answer');
        } finally {
            setIsProcessing(false);
            setTranscript('');
        }
    };

    const concludeInterview = async () => {
        setIsProcessing(true);
        toast.loading('Generating feedback...', { id: 'conclude' });

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_URL}/api/interviewer/conclude`, {
                method: 'POST',
            });

            const data = await res.json();
            setResults(data);
            setShowResults(true);
            toast.success('Interview complete!', { id: 'conclude' });
        } catch (error) {
            toast.error('Failed to conclude interview', { id: 'conclude' });
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            setTranscript('');
            recognitionRef.current?.start();
            setIsListening(true);
            toast.info('Listening... speak your answer');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-600/20 to-violet-600/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-xl">AI Voice Interviewer</h3>
                            <p className="text-sm text-gray-400">Full Stack Development • {selectedVoice?.name || 'Default Voice'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Voice Settings"
                        >
                            <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Voice Settings Panel */}
                {showVoiceSettings && (
                    <div className="p-4 bg-white/5 border-b border-white/10">
                        <label className="block text-sm text-gray-400 mb-2">Select Voice:</label>
                        <select
                            value={selectedVoice?.name || ''}
                            onChange={(e) => {
                                const voice = availableVoices.find(v => v.name === e.target.value);
                                setSelectedVoice(voice || null);
                                toast.success(`Voice changed to: ${voice?.name}`);
                            }}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        >
                            {availableVoices.map((voice, idx) => (
                                <option key={idx} value={voice.name} className="bg-gray-900">
                                    {voice.name} ({voice.lang}) {voice.localService ? '🎯' : '☁️'}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-2">🎯 = Local voice, ☁️ = Cloud voice</p>
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    {!interviewStarted ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center">
                                <Mic className="w-12 h-12 text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4">Ready for your interview?</h4>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                This AI interviewer will ask you technical questions. Answer using your voice!
                            </p>
                            <Button size="lg" onClick={startInterview} disabled={isProcessing} isLoading={isProcessing}>
                                <Sparkles className="mr-2 w-5 h-5" />
                                Start Interview
                            </Button>
                        </motion.div>
                    ) : showResults ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-3xl font-bold text-white mb-2">Interview Complete!</h4>
                                <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-4">
                                    {results?.score}/10
                                </div>
                                <p className="text-gray-300 max-w-2xl mx-auto">{results?.feedback}</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6">
                                    <h5 className="text-green-400 font-semibold mb-4 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        Strengths
                                    </h5>
                                    <ul className="space-y-2">
                                        {results?.strengths?.map((strength: string, idx: number) => (
                                            <li key={idx} className="text-gray-300 flex items-start gap-2">
                                                <span className="text-green-400 mt-1">•</span>
                                                {strength}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">
                                    <h5 className="text-orange-400 font-semibold mb-4">Areas to Improve</h5>
                                    <ul className="space-y-2">
                                        {results?.improvements?.map((improvement: string, idx: number) => (
                                            <li key={idx} className="text-gray-300 flex items-start gap-2">
                                                <span className="text-orange-400 mt-1">•</span>
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-center gap-4">
                                <Button onClick={onClose}>Close</Button>
                                <Button variant="outline" onClick={() => window.location.reload()}>
                                    New Interview
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            {/* Messages */}
                            <div className="h-96 overflow-y-auto mb-6 space-y-4">
                                <AnimatePresence>
                                    {messages.map((msg, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: msg.role === 'interviewer' ? -20 : 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`flex ${msg.role === 'candidate' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'interviewer'
                                                    ? 'bg-white/5 border border-white/10'
                                                    : 'bg-gradient-to-r from-blue-600 to-violet-600'
                                                    }`}
                                            >
                                                <div className="text-xs text-gray-400 mb-1">
                                                    {msg.role === 'interviewer' ? 'AI Interviewer' : 'You'}
                                                </div>
                                                <div className="text-white">{msg.text}</div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {isProcessing && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                            <div className="flex gap-2">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75" />
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Voice Controls */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleListening}
                                    disabled={isProcessing}
                                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all ${isListening
                                        ? 'bg-gradient-to-r from-red-600 to-red-700 animate-pulse scale-110'
                                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                                        }`}
                                >
                                    {isListening ? (
                                        <MicOff className="w-8 h-8 text-white" />
                                    ) : (
                                        <Mic className="w-8 h-8 text-white" />
                                    )}
                                </button>

                                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 min-h-[64px] flex items-center">
                                    {transcript ? (
                                        <p className="text-white">{transcript}</p>
                                    ) : isListening ? (
                                        <p className="text-gray-400 italic">Listening...</p>
                                    ) : (
                                        <p className="text-gray-500">Click microphone to answer</p>
                                    )}
                                </div>

                                <Button
                                    onClick={concludeInterview}
                                    variant="outline"
                                    disabled={messages.length < 4 || isProcessing}
                                >
                                    End Interview
                                </Button>
                            </div>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                💡 Tip: Click ⚙️ Settings to choose a different voice
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
};
