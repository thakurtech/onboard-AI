import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40',
            secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md',
            outline: 'border border-white/20 text-white hover:bg-white/10',
            ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-5 py-2.5 text-base',
            lg: 'px-7 py-3.5 text-lg',
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={twMerge(
                    clsx(
                        'relative inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
                        variants[variant],
                        sizes[size],
                        className
                    )
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
