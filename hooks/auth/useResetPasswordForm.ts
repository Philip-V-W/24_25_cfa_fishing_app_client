'use client';

import {useState} from 'react';
import {authApi} from '@/lib/api/auth';

export function useResetPasswordForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;

        try {
            await authApi.resetPassword({email});
            setSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to send reset instructions'
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        error,
        success,
        loading,
        handleSubmit
    };
}