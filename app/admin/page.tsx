'use client';

import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {QuickStats} from '@/components/admin/dashboard/QuickStats';
import {CategoryPerformance} from '@/components/admin/dashboard/CategoryPerformance';
import {DateRangeSelector} from '@/components/admin/dashboard/DateRangeSelector';
import {useAdminDashboard} from '@/hooks/admin/useAdminDashboard';
import {QUICK_ACTIONS} from '@/constants/admin';
import React from "react";
import {Card} from "@/components/ui/Card";
import Link from "next/link";

export default function AdminDashboard() {
    const {stats, loading, error, dateRange, setDateRange} = useAdminDashboard();

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                </h1>
                <DateRangeSelector
                    dateRange={dateRange}
                    onChange={setDateRange}
                />
            </div>

            {stats && <QuickStats stats={stats}/>}

            {/* Quick Actions Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {QUICK_ACTIONS.map((action) => (
                        <Link key={action.name} href={action.href}>
                            <Card
                                className="bg-white dark:bg-dark-card border dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {action.name}
                                    </h3>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                                        {action.description}
                                    </p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {stats?.topCategories && (
                <CategoryPerformance categories={stats.topCategories.categories}/>
            )}
        </div>
    );
}