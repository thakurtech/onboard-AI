import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-1.5 block text-sm font-medium text-gray-200">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={twMerge(
                        clsx(
                            'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-md transition-all focus:border-blue-500 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                            className
                        )
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
