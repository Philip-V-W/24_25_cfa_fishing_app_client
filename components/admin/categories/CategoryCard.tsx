import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {CategoryStats} from '@/types/products/category';
import Link from 'next/link';

interface CategoryCardProps {
    category: CategoryStats;
    onManage: () => void;
}

export function CategoryCard({category, onManage}: CategoryCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {category.category.replace(/_/g, ' ')}
                    </h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Products</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {category.productCount}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {category.activeProducts}
                        </p>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Stock</p>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {category.totalStock.toLocaleString()} units
                    </p>
                </div>

                <div className="mt-4">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary-600 dark:bg-primary-500"
                            style={{
                                width: `${Math.min((category.activeProducts / category.productCount) * 100, 100)}%`
                            }}
                        />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                        Active Products
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-end space-x-4">
                    <Button variant="outline" className="text-sm" onClick={onManage}>
                        Manage
                    </Button>
                    <Link href={`/admin/products?category=${category.category}`}>
                        <Button
                            variant="outline"
                            className="text-sm text-primary-600 dark:text-primary-400
                                     border-primary-600 dark:border-primary-400"
                        >
                            View Products
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}