'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Play, CheckCircle, Users, Zap,
  Brain, Target, Shield, TrendingUp, Globe, Mic, Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { VoiceAssistant } from '@/components/ui/VoiceAssistant';
import { VoiceInterviewer } from '@/components/interview/VoiceInterviewer';
import Link from 'next/link';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [showInterviewer, setShowInterviewer] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse delay-700" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Onboard AI OS
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Reduce Onboarding Time by 80%</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            AI-Powered
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Employee Enablement
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            Transform company documents into intelligent onboarding flows, personalized training,
            and skill assessments—all powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Voice AI Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => setShowVoiceAssistant(true)}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
          >
            <motion.div
              animate={{ scale: isVoiceActive ? [1, 1.2, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Mic className="w-5 h-5 text-blue-400" />
            </motion.div>
            <span className="text-sm text-gray-300">Ask AI Assistant: "How do I get started?"</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2: Stats */}
      <section className="relative py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Time Saved', value: '80%', icon: Zap },
              { label: 'Companies', value: '500+', icon: Users },
              { label: 'Employees Trained', value: '50K+', icon: Target },
              { label: 'Satisfaction', value: '98%', icon: TrendingUp },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Features Grid */}
      <section id="features" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"> Scale</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From onboarding to mastery, automate your entire employee enablement workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI Onboarding Generator',
                description: 'Upload documents, get structured onboarding plans instantly.',
                gradient: 'from-blue-500/10 to-blue-600/10',
                border: 'border-blue-500/20',
              },
              {
                icon: Target,
                title: 'Personalized Training',
                description: 'Role-specific courses with AI-generated lessons and quizzes.',
                gradient: 'from-violet-500/10 to-violet-600/10',
                border: 'border-violet-500/20',
              },
              {
                icon: Shield,
                title: 'Skill Assessments',
                description: 'Automated testing with scenario-based evaluations.',
                gradient: 'from-pink-500/10 to-pink-600/10',
                border: 'border-pink-500/20',
              },
              {
                icon: Globe,
                title: 'Multi-Language Support',
                description: 'Train global teams in their native language.',
                gradient: 'from-cyan-500/10 to-cyan-600/10',
                border: 'border-cyan-500/20',
              },
              {
                icon: TrendingUp,
                title: 'Analytics Dashboard',
                description: 'Track progress, identify gaps, measure ROI.',
                gradient: 'from-green-500/10 to-green-600/10',
                border: 'border-green-500/20',
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Built-in Slack/Teams integration for seamless communication.',
                gradient: 'from-orange-500/10 to-orange-600/10',
                border: 'border-orange-500/20',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-8 rounded-3xl bg-gradient-to-br ${feature.gradient} border ${feature.border} backdrop-blur-md cursor-pointer group`}
              >
                <feature.icon className="w-12 h-12 mb-6 text-white group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section id="how-it-works" className="relative py-32 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-400">Go from chaos to clarity in 3 steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Upload Your Content', desc: 'Drop company docs, videos, or links' },
              { step: '02', title: 'AI Generates Flows', desc: 'Automated plans, courses, and assessments' },
              { step: '03', title: 'Assign & Track', desc: 'Monitor progress and skill development' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-8xl font-bold text-white/5 mb-4">{item.step}</div>
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 text-lg">{item.desc}</p>
                {idx < 2 && (
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="hidden md:block absolute top-1/2 -right-6 text-blue-400"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Voice AI Demo */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-3xl p-12 border border-blue-500/30 backdrop-blur-xl"
          >
            <Mic className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Talk to Your Training Assistant
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI voice assistant guides employees through onboarding, answers questions,
              and provides instant feedback—24/7.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => setShowVoiceAssistant(true)}>
              <Volume2 className="mr-2 w-5 h-5" />
              Try Voice AI
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="relative py-32 bg-gradient-to-b from-black to-violet-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-20"
          >
            Trusted by Industry Leaders
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'VP of HR, TechCorp', quote: 'Cut onboarding from 6 weeks to 10 days.' },
              { name: 'Michael Chen', role: 'CTO, StartupXYZ', quote: 'Best investment we made this year.' },
              { name: 'Emily Davis', role: 'L&D Director, Global Inc', quote: 'Employee satisfaction up 40%.' },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Pricing */}
      <section id="pricing" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-400">Choose the plan that fits your team</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$299', users: 'Up to 25 users', features: ['AI Onboarding', 'Basic Analytics', 'Email Support'] },
              { name: 'Professional', price: '$999', users: 'Up to 100 users', features: ['Everything in Starter', 'AI Training Builder', 'Voice AI', 'Priority Support'], popular: true },
              { name: 'Enterprise', price: 'Custom', users: 'Unlimited users', features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support', 'SSO'] },
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 rounded-3xl border backdrop-blur-md ${plan.popular
                  ? 'bg-gradient-to-br from-blue-600/20 to-violet-600/20 border-blue-500/50 scale-105'
                  : 'bg-white/5 border-white/10'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-5xl font-bold mb-2">{plan.price}</div>
                <div className="text-gray-400 mb-6">{plan.users}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full" size="lg" variant={plan.popular ? 'primary' : 'outline'}>
                    Get Started
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Integration Showcase */}
      <section className="relative py-32 bg-gradient-to-b from-black to-blue-950/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-bold mb-12"
          >
            Integrates With Your Stack
          </motion.h2>

          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['Slack', 'Teams', 'Google', 'Notion', 'Salesforce', 'HubSpot'].map((name, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 0.5, scale: 1 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: CTA */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 md:p-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Onboarding?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90">
              Join 500+ companies automating employee enablement with AI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-black hover:bg-gray-100">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-4">
                Onboard AI OS
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered employee enablement platform
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            © 2025 Onboard AI OS. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Section 10: AI Interviewer CTA */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-violet-600/20 to-pink-600/20 rounded-3xl p-12 border border-violet-500/30 backdrop-blur-xl"
          >
            <Mic className="w-16 h-16 mx-auto mb-6 text-violet-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Practice with AI Voice Interviewer
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get interview-ready with our AI voice interviewer. Real-time feedback on your technical knowledge.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => setShowInterviewer(true)}>
              <Mic className="mr-2 w-5 h-5" />
              Start AI Interview
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Voice Assistant Modal */}
      <AnimatePresence>
        {showVoiceAssistant && (
          <VoiceAssistant onClose={() => setShowVoiceAssistant(false)} />
        )}
        {showInterviewer && (
          <VoiceInterviewer onClose={() => setShowInterviewer(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
