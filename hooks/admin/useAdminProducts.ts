'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {ProductResponse, ProductCategory, ProductRequest} from '@/types/product';
import {productApi} from '@/lib/api/products';

interface ProductFilters {
    category: ProductCategory | 'ALL';
    showInactive: boolean;
    searchTerm: string;
    stockLevel: string;
}

export function useAdminProducts() {
    const {user, isAdmin} = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ProductFilters>({
        category: 'ALL',
        showInactive: false,
        searchTerm: '',
        stockLevel: 'all'
    });

    useEffect(() => {
        if (!user || !isAdmin) {
            router.push('/auth/login');
            return;
        }
        loadProducts();
    }, [user, isAdmin]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productApi.getAllForAdmin();
            setProducts(data);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
            setError(errorMessage);
            if (errorMessage.includes('401') || errorMessage.includes('403')) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleProductStatus = async (productId: number,) => {
        try {
            await productApi.toggleStatus(productId);
            await loadProducts();
        } catch (err) {
            console.error('Error updating product status:', err);
        }
    };

    const updateProduct = async (productId: number, data: ProductRequest) => {
        try {
            await productApi.updateProduct(productId, data);
            await loadProducts();
        } catch (err) {
            console.error('Error updating product:', err);
            throw err;
        }
    };

    const filteredProducts = products
        .filter(product => !filters.category || filters.category === 'ALL' || product.category === filters.category)
        .filter(product => filters.showInactive || product.active)
        .filter(product =>
            filters.searchTerm === '' ||
            product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );

    return {
        products: filteredProducts,
        loading,
        error,
        filters,
        setFilters,
        loadProducts,
        toggleProductStatus,
        updateProduct,
    };
}