'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {adminApi} from '@/lib/api/admin';
import type {DashboardStatsResponse} from '@/types/admin';

interface DateRange {
    startDate: string;
    endDate: string;
}

export function useAdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        loadDashboardStats();
    }, [dateRange]);

    const loadDashboardStats = async () => {
        try {
            const data = await adminApi.getDashboardStats(dateRange.startDate, dateRange.endDate);
            setStats(data);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard statistics';
            setError(errorMessage);
            if (errorMessage.includes('401')) {
                await router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        stats,
        loading,
        error,
        dateRange,
        setDateRange
    };
}