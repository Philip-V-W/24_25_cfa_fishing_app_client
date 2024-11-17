import {useState, useEffect} from 'react';
import {ContestResponse, ContestStatus} from '@/types/contest';
import {contestApi} from '@/lib/api/contests';

export function useContests() {
    const [upcomingContests, setUpcomingContests] = useState<ContestResponse[]>([]);
    const [ongoingContests, setOngoingContests] = useState<ContestResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContests = async () => {
        try {
            const [upcoming, ongoing] = await Promise.all([
                contestApi.getUpcoming(),
                contestApi.getOngoing(),
            ]);

            const transformResponse = (contests: any[]): ContestResponse[] => {
                return contests.map(contest => ({
                    ...contest,
                    status: contest.status || ContestStatus.UPCOMING,
                    currentParticipants: contest.registrations?.length || 0,
                    isRegistered: false
                }));
            };

            setUpcomingContests(transformResponse(upcoming));
            setOngoingContests(transformResponse(ongoing));
        } catch (err) {
            console.error('API Error:', err);
            setError(err instanceof Error ? err.message : 'Failed to load contests');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContests();
    }, []);

    return {
        upcomingContests,
        ongoingContests,
        loading,
        error,
        refreshContests: fetchContests
    };
}