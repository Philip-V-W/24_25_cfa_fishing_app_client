import {Card} from '@/components/ui/Card';
import type {CategoryStats} from '@/types/products/category';

interface CategoryStatsProps {
    categories: CategoryStats[];
}

export function CategoryStats({categories}: CategoryStatsProps) {
    const totalProducts = categories.reduce((sum, cat) => sum + cat.productCount, 0);
    const totalStock = categories.reduce((sum, cat) => sum + cat.totalStock, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard title="Total Categories" value={categories.length}/>
            <StatsCard title="Total Products" value={totalProducts}/>
            <StatsCard
                title="Total Stock"
                value={totalStock.toLocaleString()}
            />
        </div>
    );
}

interface StatsCardProps {
    title: string;
    value: string | number;
}

function StatsCard({title, value}: StatsCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <p className="mt-2 text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {value}
                </p>
            </div>
        </Card>
    );
}