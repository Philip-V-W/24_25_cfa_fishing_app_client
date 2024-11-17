'use client';

import {useState, useEffect} from 'react';
import {useAuth} from '@/context/AuthContext';
import {permitApi} from '@/lib/api/permits';
import {PermitResponse} from '@/types/permit';

export function useUserPermits() {
    const [permits, setPermits] = useState<PermitResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            loadPermits();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadPermits = async () => {
        try {
            const userPermits = await permitApi.getUserPermits();
            setPermits(userPermits);
        } catch (err) {
            setError('Failed to load permits');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        permits,
        loading,
        error,
        user
    };
}