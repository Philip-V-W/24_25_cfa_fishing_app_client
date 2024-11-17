import {useState, useEffect} from 'react';
import {ContestResponse} from '@/types/contest';
import {API_URL} from '@/lib/api/config';

export function useContestDetails(contestId: string) {
    const [contest, setContest] = useState<ContestResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContestDetails = async () => {
            try {
                console.log('Fetching contest:', contestId);
                const response = await fetch(`${API_URL}/api/contests/${contestId}`);
                const data = await response.json();
                console.log('Received data:', data);
                setContest(data);
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to load contest details');
            } finally {
                setLoading(false);
            }
        };

        fetchContestDetails();
    }, [contestId]);

    return {contest, loading, error};
}