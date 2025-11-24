'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            localStorage.setItem('token', data.token);
            // Redirect to dashboard (to be implemented)
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Sign in to continue to Onboard AI OS"
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

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign In
                </Button>

                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                        Sign up
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
