'use client';

import {useState, useEffect} from 'react';
import {ContestResponse, ContestStatus} from '@/types/contest';
import {contestApi} from '@/lib/api/contests';

export function useAdminContests() {
    const [contests, setContests] = useState<ContestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<ContestStatus | 'ALL'>('ALL');

    useEffect(() => {
        loadContests();
    }, []);

    const loadContests = async () => {
        try {
            setLoading(true);
            const [upcoming, ongoing] = await Promise.all([
                contestApi.getUpcoming(),
                contestApi.getOngoing()
            ]);
            setContests([...upcoming, ...ongoing]);
            setError(null);
        } catch (err) {
            setError('Failed to load contests');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredContests = contests.filter(contest =>
        filterStatus === 'ALL' || contest.status === filterStatus
    );

    return {
        contests: filteredContests,
        totalContests: contests.length,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        loadContests
    };
}