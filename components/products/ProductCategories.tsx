import {ProductCategory} from "@/types/product";

interface ProductCategoriesProps {
    selectedCategory: ProductCategory | 'ALL';
    onCategorySelect: (category: ProductCategory | 'ALL') => void;
}

export function ProductCategories({selectedCategory, onCategorySelect}: ProductCategoriesProps) {
    return (
        <div>
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2">
                {['ALL', ...Object.values(ProductCategory)].map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategorySelect(category as ProductCategory | 'ALL')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                            ${selectedCategory === category
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {category.replace('_', ' ')}
                    </button>
                ))}
            </div>
        </div>
    );
}