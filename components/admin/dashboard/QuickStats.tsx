import {DashboardStatsResponse} from '@/types/admin';
import {Card} from "@/components/ui/Card";

interface QuickStatsProps {
    stats: DashboardStatsResponse;
}

export function QuickStats({stats}: QuickStatsProps) {
    const statsConfig = [
        {label: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`},
        {label: 'New Orders', value: stats.newOrders},
        {label: 'Pending Permits', value: stats.pendingPermits},
        {label: 'Upcoming Contests', value: stats.upcomingContests},
        {label: 'Average Order Value', value: `$${stats.averageOrderValue.toLocaleString()}`},
        {label: 'Total Customers', value: stats.totalCustomers},
        {label: 'New Customers', value: stats.newCustomers},
        {label: 'Total Orders', value: stats.totalOrders}
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsConfig.map((stat, index) => (
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
    );
}
