import {Card} from '@/components/ui/Card';
import type {SalesStatsResponse} from '@/types/admin';

interface SalesOverviewProps {
    stats: SalesStatsResponse;
}

export function SalesOverview({stats}: SalesOverviewProps) {
    const overviewStats = [
        {
            label: 'Total Revenue',
            value: `$${stats.totalRevenue.toLocaleString()}`
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders.toLocaleString()
        },
        {
            label: 'Average Order Value',
            value: `$${stats.averageOrderValue.toLocaleString()}`
        }
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Sales Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {overviewStats.map((stat, index) => (
                    <Card key={index} className="bg-white dark:bg-dark-card border dark:border-dark-border">
                        <div className="p-6">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </p>
                            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Daily Sales
                    </h3>
                    <div className="space-y-4">
                        {stats.dailyStats.map((day) => (
                            <div
                                key={day.date}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {new Date(day.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {day.orders} orders
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                    ${day.revenue.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </section>
    );
}