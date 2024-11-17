'use client';

import Link from "next/link";
import {Button} from "@/components/ui/Button";
import {AuthCard} from '@/components/auth/AuthCard';
import {AuthInput} from '@/components/auth/AuthInput';
import {useLoginForm} from '@/hooks/auth/useLoginForm';

export default function LoginPage() {
    const {error, loading, handleSubmit} = useLoginForm();

    const cardFooter = (
        <>
            <span className="text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
            </span>
            <Link
                href="/auth/register"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500"
            >
                Sign up
            </Link>
        </>
    );

    return (
        <AuthCard
            title="Welcome back"
            subtitle="Sign in to your account"
            error={error}
            footer={cardFooter}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    required
                />
                <AuthInput
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    required
                />
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
        </AuthCard>
    );
}