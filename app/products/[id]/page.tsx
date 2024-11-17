'use client';

import React from 'react';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {ProductBreadcrumb} from '@/components/products/detail/ProductBreadcrumb';
import {ProductQuantitySelector} from '@/components/products/detail/ProductQuantitySelector';
import {useProductDetail} from '@/hooks/product/useProductDetail';
import Link from "next/link";

export default function ProductDetailPage({params}: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const {
        product,
        loading,
        error,
        quantity,
        handleQuantityChange,
        handleAddToCart
    } = useProductDetail(unwrappedParams.id);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <p className="text-red-500 dark:text-red-400 mb-4">
                    {error || 'Product not found'}
                </p>
                <Link href="/products">
                    <Button variant="primary">Back to Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            <ProductBreadcrumb
                category={product.category}
                productName={product.name}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <Card className="overflow-hidden bg-white dark:bg-dark-card border dark:border-dark-border">
                    <img
                        src={`/images/products/${product.imageUrl}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </Card>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {product.name}
                        </h1>
                        <div className="mt-4">
                            <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                ${product.price}
                            </span>
                        </div>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                            product.stockQuantity > 0
                                ? 'bg-green-500'
                                : 'bg-red-500'
                        }`}/>
                        <span className={`text-sm font-medium ${
                            product.stockQuantity > 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                        }`}>
                            {product.stockQuantity > 0
                                ? `In Stock (${product.stockQuantity} available)`
                                : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Description
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {product.description}
                        </p>
                    </div>

                    {/* Category */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Category
                        </h2>
                        <Link
                            href={`/products/category/${product.category}`}
                            className="inline-flex items-center px-3 py-1 rounded-full
                                     bg-primary-100 text-primary-800 dark:bg-primary-900/30
                                     dark:text-primary-400 text-sm font-medium"
                        >
                            {product.category.replace('_', ' ')}
                        </Link>
                    </div>

                    {/* Add to Cart Section */}
                    {product.stockQuantity > 0 && (
                        <div className="pt-6 border-t dark:border-dark-border">
                            <div className="flex items-center space-x-4">
                                <ProductQuantitySelector
                                    quantity={quantity}
                                    maxQuantity={product.stockQuantity}
                                    onQuantityChange={handleQuantityChange}
                                />
                                <Button
                                    variant="primary"
                                    className="flex-1"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                            {quantity >= product.stockQuantity && (
                                <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
                                    Maximum available quantity selected
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}