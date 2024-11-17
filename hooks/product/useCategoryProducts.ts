'use client';

import {useState, useEffect} from 'react';
import {ProductResponse, ProductCategory} from '@/types/product';
import {productApi} from '@/lib/api/products';

type SortOption = 'price_asc' | 'price_desc' | 'name';

export function useCategoryProducts(category: string) {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('name');

    const normalizedCategory = category.toUpperCase() as ProductCategory;
    const isValidCategory = Object.values(ProductCategory).includes(normalizedCategory);

    useEffect(() => {
        if (isValidCategory) {
            loadProducts();
        }
    }, [normalizedCategory]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productApi.getByCategory(normalizedCategory);
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const sortedProducts = [...products.filter(product => product.active)].sort((a, b) => {
        switch (sortBy) {
            case 'price_asc':
                return Number(a.price) - Number(b.price);
            case 'price_desc':
                return Number(b.price) - Number(a.price);
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    return {
        products: sortedProducts,
        loading,
        error,
        sortBy,
        setSortBy,
        loadProducts,
        isValidCategory,
        category: normalizedCategory
    };
}