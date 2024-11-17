import {CategoryCard} from './CategoryCard';
import {CategoryStats} from '@/types/products/category';
import {Button} from '@/components/ui/Button';

interface CategoryGridProps {
    categories: CategoryStats[];
    onManageCategory: (category: CategoryStats) => void;
    onAddCategory: () => void;
}

export function CategoryGrid({categories, onManageCategory, onAddCategory}: CategoryGridProps) {
    if (categories.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No categories found. Create your first category to get started.
                </p>
                <Button variant="primary" className="mt-4" onClick={onAddCategory}>
                    Add Category
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <CategoryCard
                    key={category.category}
                    category={category}
                    onManage={() => onManageCategory(category)}
                />
            ))}
        </div>
    );
}