'use client';

import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {AnalyticsHeader} from '@/components/admin/analytics/AnalyticsHeader';
import {AnalyticsError} from '@/components/admin/analytics/AnalyticsError';
import {SalesOverview} from '@/components/admin/analytics/SalesOverview';
import {InventoryStatus} from '@/components/admin/analytics/InventoryStatus';
import {TopCustomers} from '@/components/admin/analytics/TopCustomers';
import {useAnalyticsDashboard} from '@/hooks/admin/useAnalyticsDashboard';

export default function AdminAnalyticsPage() {
    const {
        stats,
        dateRange,
        loading,
        error,
        setDateRange,
        loadStats
    } = useAnalyticsDashboard();

    if (loading) return <LoadingSpinner/>;

    if (error) {
        return <AnalyticsError error={error} onRetry={loadStats}/>;
    }

    return (
        <div className="space-y-8">
            <AnalyticsHeader
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
            />

            {stats.sales && <SalesOverview stats={stats.sales}/>}
            {stats.inventory && <InventoryStatus stats={stats.inventory}/>}
            {stats.sales?.topCustomers && (
                <TopCustomers customers={stats.sales.topCustomers}/>
            )}
        </div>
    );
}