import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {contestApi} from '@/lib/api/contests';

export function useRegisterContest(contestId: string) {
    const router = useRouter();
    const {user} = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) {
            router.push('/auth/login');
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await contestApi.register(Number(contestId));
            router.push('/contests');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to register for contest');
        } finally {
            setSubmitting(false);
        }
    };

    return {
        user,
        submitting,
        error,
        register
    };
}