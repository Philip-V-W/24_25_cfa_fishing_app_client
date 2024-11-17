import {Card} from '@/components/ui/Card';
import type {InventoryStatsResponse} from '@/types/admin';

interface InventoryStatusProps {
    stats: InventoryStatsResponse;
}

export function InventoryStatus({stats}: InventoryStatusProps) {
    const inventoryStats = [
        {
            label: 'Total Products',
            value: stats.totalProducts
        },
        {
            label: 'Low Stock Products',
            value: stats.lowStockProducts,
            alert: true
        },
        {
            label: 'Out of Stock Products',
            value: stats.outOfStockProducts,
            alert: true
        }
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Inventory Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {inventoryStats.map((stat, index) => (
                    <Card key={index} className="bg-white dark:bg-dark-card border dark:border-dark-border">
                        <div className="p-6">
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {stat.label}
                            </p>
                            <p className={`mt-2 text-3xl font-bold ${
                                stat.alert && stat.value > 0
                                    ? 'text-red-600 dark:text-red-400'
                                    : 'text-gray-900 dark:text-white'
                            }`}>
                                {stat.value}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="bg-white dark:bg-dark-card border dark:border-dark-border mb-6">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Top Selling Products
                    </h3>
                    <div className="space-y-4">
                        {stats.topSellingProducts.map((product) => (
                            <div
                                key={product.productId}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {product.productName}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Current Stock: {product.currentStock}
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                                    {product.totalSold} sold
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </section>
    );
}