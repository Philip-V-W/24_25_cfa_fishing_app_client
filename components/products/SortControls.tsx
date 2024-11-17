type SortOption = 'price_asc' | 'price_desc' | 'name';

interface SortControlsProps {
    total: number;
    sortBy: SortOption;
    onSortChange: (value: SortOption) => void;
}

export function SortControls({total, sortBy, onSortChange}: SortControlsProps) {
    return (
        <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
                {total} products found
            </p>
            <div className="flex items-center space-x-4">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                    Sort by:
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="rounded-lg border border-gray-300 dark:border-dark-border
                           bg-white dark:bg-dark-card px-3 py-2 text-gray-900 dark:text-white"
                >
                    <option value="name">Name</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
            </div>
        </div>
    );
}