'use client';

import Link from 'next/link';
import {Button} from '@/components/ui/Button';
import {AuthCard} from '@/components/auth/AuthCard';
import {AuthInput} from '@/components/auth/AuthInput';
import {useRegisterForm} from '@/hooks/auth/useRegisterForm';

export default function RegisterPage() {
    const {error, loading, handleSubmit} = useRegisterForm();

    const cardFooter = (
        <>
            <span className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
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
            title="Create an account"
            subtitle="Join our fishing community"
            error={error}
            footer={cardFooter}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <AuthInput
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First Name"
                        required
                    />
                    <AuthInput
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last Name"
                        required
                    />
                </div>
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
                    {loading ? 'Creating account...' : 'Create account'}
                </Button>
            </form>
        </AuthCard>
    );
}