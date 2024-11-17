import {useState, useEffect} from 'react';
import {contestApi} from '@/lib/api/contests';
import type {RegistrationResponse} from '@/types/contest';

export function useContestRegistrations() {
    const [registrations, setRegistrations] = useState<RegistrationResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadRegistrations = async () => {
        try {
            setLoading(true);
            const data = await contestApi.getUserRegistrations();
            setRegistrations(data);
            setError(null);
        } catch (err) {
            setError('Failed to load registrations');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const cancelRegistration = async (contestId: number) => {
        try {
            await contestApi.cancelRegistration(contestId);
            await loadRegistrations();
        } catch (err) {
            console.error('Error cancelling registration:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadRegistrations();
    }, []);

    return {
        registrations,
        loading,
        error,
        loadRegistrations,
        cancelRegistration
    };
}