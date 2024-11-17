'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {adminApi} from '@/lib/api/admin';
import type {
    SalesStatsResponse,
    DashboardStatsResponse,
    InventoryStatsResponse
} from '@/types/admin';

interface DateRange {
    startDate: string;
    endDate: string;
}

export function useAnalyticsDashboard() {
    const {user, isAdmin} = useAuth();
    const router = useRouter();
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
    });
    const [stats, setStats] = useState<{
        sales: SalesStatsResponse | null;
        dashboard: DashboardStatsResponse | null;
        inventory: InventoryStatsResponse | null;
    }>({
        sales: null,
        dashboard: null,
        inventory: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !isAdmin) {
            router.push('/auth/login');
            return;
        }
        loadStats();
    }, [dateRange, user, isAdmin]);

    const loadStats = async () => {
        try {
            setLoading(true);
            setError(null);

            const [sales, dashboard, inventory] = await Promise.all([
                adminApi.getSalesStats(dateRange.startDate, dateRange.endDate),
                adminApi.getDashboardStats(dateRange.startDate, dateRange.endDate),
                adminApi.getInventoryStats()
            ]);

            setStats({
                sales,
                dashboard,
                inventory
            });
        } catch (err) {
            console.error('Stats loading error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Failed to load analytics data';
            setError(errorMessage);

            if (errorMessage.includes('403') || errorMessage.includes('401')) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        stats,
        dateRange,
        loading,
        error,
        setDateRange,
        loadStats
    };
}