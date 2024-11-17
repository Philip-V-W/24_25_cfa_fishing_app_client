'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useContestDetails } from '@/hooks/useContestDetails';

export function useContestPage(params: Promise<{ id: string }>) {
    const resolvedParams = use(params);
    const router = useRouter();
    const { user } = useAuth();
    const { contest, loading, error } = useContestDetails(resolvedParams.id);

    const handleRegisterClick = () => {
        if (!user) {
            router.push('/auth/login');
            return;
        }
        router.push(`/contests/${resolvedParams.id}/register`);
    };

    return {
        contest,
        loading,
        error,
        handleRegisterClick
    };
}