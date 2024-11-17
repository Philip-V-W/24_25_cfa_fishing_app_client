import {Card} from '@/components/ui/Card';
import type {SalesStatsResponse} from '@/types/admin';

interface TopCustomersProps {
    customers: SalesStatsResponse['topCustomers'];
}

export function TopCustomers({customers}: TopCustomersProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Top Customers
            </h2>
            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
                <div className="p-6">
                    <div className="space-y-4">
                        {customers.map((customer) => (
                            <div
                                key={customer.userId}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {customer.email}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {customer.orderCount} orders
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                    ${customer.totalSpent.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </section>
    );
}