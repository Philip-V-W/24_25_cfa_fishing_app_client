'use client';

import {ProductHero} from '@/components/products/ProductHero';
import {ProductSearch} from '@/components/products/ProductSearch';
import {ProductCategories} from '@/components/products/ProductCategories';
import {ProductGrid} from '@/components/products/ProductGrid';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {useProducts} from '@/hooks/product/useProducts';
import {Button} from "@/components/ui/Button";

export default function ProductsPage() {
    const {
        products,
        loading,
        error,
        selectedCategory,
        searchTerm,
        setSelectedCategory,
        setSearchTerm,
        handleSearch,
        loadProducts
    } = useProducts();

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="space-y-8">
            <ProductHero/>

            <div className="space-y-4">
                <ProductSearch
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearch={handleSearch}
                />
                <ProductCategories
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            </div>

            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={loadProducts}>
                        Retry
                    </Button>
                </div>
            ) : (
                <>
                    <ProductGrid products={products}/>
                    {products.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                No products found matching your criteria.
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}