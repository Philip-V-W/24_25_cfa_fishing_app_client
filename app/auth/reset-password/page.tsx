'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/Button';
import {AuthCard} from '@/components/auth/AuthCard';
import {AuthInput} from '@/components/auth/AuthInput';
import {useResetPasswordForm} from '@/hooks/auth/useResetPasswordForm';

export default function ResetPasswordPage() {
    const {error, success, loading, handleSubmit} = useResetPasswordForm();

    const footer = (
        <>
            <span className="text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
            </span>
            <Link
                href="/auth/login"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
            >
                Sign in
            </Link>
        </>
    );

    return (
        <AuthCard
            title="Reset your password"
            subtitle="Enter your email to receive reset instructions"
            error={error}
            footer={footer}
        >
            {success ? (
                <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">Check your email</h3>
                    <p className="text-sm">
                        We've sent password reset instructions to your email address.
                        Please check your inbox.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <AuthInput
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        autoComplete="email"
                        required
                        placeholder="Enter your email address"
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Sending instructions...' : 'Send reset instructions'}
                    </Button>
                </form>
            )}
        </AuthCard>
    );
}