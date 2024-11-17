'use client';

import {useState, useEffect} from 'react';
import {ProductResponse, ProductCategory} from '@/types/product';
import {productApi} from '@/lib/api/products';

export function useProducts() {
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadProducts();
    }, [selectedCategory]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = selectedCategory === 'ALL'
                ? await productApi.getAll()
                : await productApi.getByCategory(selectedCategory);

            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            loadProducts();
            return;
        }

        try {
            setLoading(true);
            const data = await productApi.search(searchTerm);
            setProducts(data);
        } catch (err) {
            setError('Failed to search products');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        loading,
        error,
        selectedCategory,
        searchTerm,
        setSelectedCategory,
        setSearchTerm,
        handleSearch,
        loadProducts
    };
}