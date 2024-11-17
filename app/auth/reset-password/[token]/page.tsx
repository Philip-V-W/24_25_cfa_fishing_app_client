'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthInput } from '@/components/auth/AuthInput';
import { API_URL } from '@/lib/api/config';

export default function ResetPasswordConfirmPage() {
    const router = useRouter();
    const params = useParams();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/reset-password/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: params.token,
                    password
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to reset password');
            }

            router.push('/auth/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthCard
            title="Set new password"
            subtitle="Enter your new password below"
            error={error}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    id="password"
                    name="password"
                    type="password"
                    label="New Password"
                    required
                    minLength={8}
                />
                <AuthInput
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm New Password"
                    required
                    minLength={8}
                />
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white"
                    disabled={loading}
                >
                    {loading ? 'Resetting password...' : 'Reset password'}
                </Button>
            </form>
        </AuthCard>
    );
}