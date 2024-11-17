import {useState, useEffect} from 'react';
import {permitApi} from '@/lib/api/permits';
import type {PermitResponse} from '@/types/permit';

export function usePermits() {
    const [permits, setPermits] = useState<PermitResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadPermits = async () => {
        try {
            setLoading(true);
            const data = await permitApi.getUserPermits();
            setPermits(data);
            setError(null);
        } catch (err) {
            setError('Failed to load permits');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const downloadPermit = async (permitId: number) => {
        try {
            const data = await permitApi.downloadPermit(permitId);
            // Handle file download (implement based on your needs)
            console.log('Downloading permit:', permitId);
        } catch (err) {
            console.error('Error downloading permit:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadPermits();
    }, []);

    return {
        permits,
        loading,
        error,
        loadPermits,
        downloadPermit
    };
}