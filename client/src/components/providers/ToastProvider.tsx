'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: 'rgba(17, 24, 39, 0.95)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    color: 'white',
                    backdropFilter: 'blur(12px)',
                },
                className: 'toast-notification',
            }}
            richColors
        />
    );
}
