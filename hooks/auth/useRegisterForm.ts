'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {authApi} from '@/lib/api/auth';

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export function useRegisterForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const userData: RegisterData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string
        };

        try {
            await authApi.register(userData);
            router.push('/auth/login?registered=true');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to create account. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        error,
        loading,
        handleSubmit
    };
}