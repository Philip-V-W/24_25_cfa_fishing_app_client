'use client';

import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {CategoryHeader} from '@/components/products/CategoryHeader';
import {ProductGrid} from '@/components/products/ProductGrid';
import {SortControls} from '@/components/products/SortControls';
import {useCategoryProducts} from '@/hooks/product/useCategoryProducts';
import {Button} from "@/components/ui/Button";
import Link from "next/link";

export default function CategoryProductsPage({params}: { params: { slug: string } }) {
    const {
        products,
        loading,
        error,
        sortBy,
        setSortBy,
        loadProducts,
        isValidCategory,
        category
    } = useCategoryProducts(params.slug);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (!isValidCategory) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <p className="text-red-500 dark:text-red-400 mb-4">
                    Category not found
                </p>
                <Link href="/products">
                    <Button variant="primary">
                        Back to Products
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <CategoryHeader category={category}/>

            <SortControls
                total={products.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400">{error}</p>
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={loadProducts}
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <ProductGrid products={products}/>
            )}

            {products.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        No products found in this category.
                    </p>
                    <Link href="/products">
                        <Button variant="primary" className="mt-4">
                            View All Products
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}