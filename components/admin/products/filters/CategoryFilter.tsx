import {Card} from '@/components/ui/Card';
import {ProductCategory} from '@/types/product';

interface CategoryFilterProps {
    value: ProductCategory | 'ALL';
    onChange: (category: ProductCategory | 'ALL') => void;
}

export function CategoryFilter({value, onChange}: CategoryFilterProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category Filter
                </label>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value as ProductCategory | 'ALL')}
                    className="w-full rounded-lg border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                             focus:border-primary-500 focus:ring-primary-500"
                >
                    <option value="ALL">All Categories</option>
                    {Object.values(ProductCategory).map((category) => (
                        <option key={category} value={category}>
                            {category.replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </div>
        </Card>
    );
}