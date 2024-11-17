import {ProductCategory} from '@/types/product';
import {SearchFilter} from './filters/SearchFilter';
import {CategoryFilter} from './filters/CategoryFilter';
import {StockFilter} from './filters/StockFilter';
import {StatusToggle} from './filters/StatusToggle';

interface ProductFiltersProps {
    filters: {
        category: ProductCategory | 'ALL';
        showInactive: boolean;
        searchTerm: string;
        stockLevel: string;
    };
    onUpdateFilters: (filters: ProductFiltersProps['filters']) => void;
}

export function ProductFilters({filters, onUpdateFilters}: ProductFiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <SearchFilter
                value={filters.searchTerm}
                onChange={(searchTerm) => onUpdateFilters({...filters, searchTerm})}
            />
            <CategoryFilter
                value={filters.category}
                onChange={(category) => onUpdateFilters({...filters, category})}
            />
            <StockFilter
                value={filters.stockLevel}
                onChange={(stockLevel) => onUpdateFilters({...filters, stockLevel})}
            />
            <StatusToggle
                value={filters.showInactive}
                onChange={(showInactive) => onUpdateFilters({...filters, showInactive})}
            />
        </div>
    );
}