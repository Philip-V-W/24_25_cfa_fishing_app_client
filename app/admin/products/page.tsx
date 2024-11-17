'use client';

import {ProductFilters} from '@/components/admin/products/ProductFilters';
import {ProductGrid} from '@/components/admin/products/ProductGrid';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {ErrorDisplay} from '@/components/ui/ErrorDisplay';
import {PageHeader} from '@/components/admin/products/PageHeader';
import {useAdminProducts} from '@/hooks/admin/useAdminProducts';

export default function AdminProductsPage() {
    const {
        products,
        loading,
        error,
        filters,
        setFilters,
        loadProducts,
        toggleProductStatus
    } = useAdminProducts();

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="space-y-8">
            <PageHeader/>

            <ProductFilters
                filters={filters}
                onUpdateFilters={setFilters}
            />

            {error ? (
                <ErrorDisplay error={error} onRetry={loadProducts}/>
            ) : (
                <ProductGrid
                    products={products}
                    onToggleStatus={toggleProductStatus}
                />
            )}
        </div>
    );
}