'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'employee', // Default role
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            localStorage.setItem('token', data.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Get started with Onboard AI OS"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                />

                {/* Role Selection (Simple Select for MVP) */}
                <div className="w-full">
                    <label className="mb-1.5 block text-sm font-medium text-gray-200">
                        Role
                    </label>
                    <select
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-md transition-all focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="employee" className="bg-gray-900">Employee</option>
                        <option value="hr" className="bg-gray-900">HR Manager</option>
                        <option value="admin" className="bg-gray-900">Admin</option>
                    </select>
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Create Account
                </Button>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
