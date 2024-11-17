import {Card} from '@/components/ui/Card';
import {OrderStatus} from '@/types/order';

interface OrderFiltersProps {
    currentFilter: OrderStatus | 'ALL';
    onFilterChange: (status: OrderStatus | 'ALL') => void;
}

export function OrderFilters({currentFilter, onFilterChange}: OrderFiltersProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-4 flex flex-wrap gap-2">
                {['ALL', ...Object.values(OrderStatus)].map((status) => (
                    <button
                        key={status}
                        onClick={() => onFilterChange(status as OrderStatus | 'ALL')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                            ${currentFilter === status
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {status.replace('_', ' ')}
                    </button>
                ))}
            </div>
        </Card>
    );
}