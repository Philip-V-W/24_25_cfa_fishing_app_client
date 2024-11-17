'use client';

import {useState, useEffect} from 'react';
import {permitApi} from '@/lib/api/permits';
import {PermitResponse, PermitStatus} from '@/types/permit';

export function usePermitDetail(permitId: string) {
    const [permit, setPermit] = useState<PermitResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPermitDetails = async () => {
            try {
                const data = await permitApi.getPermitById(permitId);
                setPermit(data);
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : 'Failed to load permit details');
            } finally {
                setLoading(false);
            }
        };

        fetchPermitDetails();
    }, [permitId]);

    return {permit, loading, error};
}