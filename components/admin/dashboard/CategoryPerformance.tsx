import {Card} from "@/components/ui/Card";

interface CategoryPerformanceProps {
    categories: {
        category: string;
        revenue: number;
        totalProducts: number;
        totalSold: number;
    }[];
}

export function CategoryPerformance({categories}: CategoryPerformanceProps) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Category Performance
            </h2>
            <div className="grid grid-cols-1 gap-6">
                {categories.map((category) => (
                    <Card
                        key={category.category}
                        className="bg-white dark:bg-dark-card border dark:border-dark-border"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {category.category}
                                </h3>
                                <span className="text-primary-600 dark:text-primary-400 font-medium">
                                    ${category.revenue.toLocaleString()}
                                </span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Products
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        {category.totalProducts}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Sold
                                    </p>
                                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                                        {category.totalSold}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}