'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {PermitResponse, PermitStatus} from '@/types/permit';
import {permitApi} from '@/lib/api/permits';

export function useAdminPermits() {
    const {user, isAdmin} = useAuth();
    const router = useRouter();
    const [permits, setPermits] = useState<PermitResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<PermitStatus | 'ALL'>('ALL');

    useEffect(() => {
        if (!user || !isAdmin) {
            router.push('/auth/login');
            return;
        }
        loadPermits();
    }, [user, isAdmin]);

    const loadPermits = async () => {
        try {
            setLoading(true);
            const data = await permitApi.getAll();
            setPermits(data);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load permits';
            setError(errorMessage);
            if (errorMessage.includes('401') || errorMessage.includes('403')) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (permitId: number) => {
        try {
            await permitApi.approve(permitId);
            await loadPermits();
        } catch (err) {
            console.error('Error approving permit:', err);
        }
    };

    const filteredPermits = permits.filter(permit =>
        filterStatus === 'ALL' || permit.status === filterStatus
    );

    return {
        permits: filteredPermits,
        totalPermits: permits.length,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        loadPermits,
        handleApprove
    };
}