'use client';

import {useState, useEffect} from 'react';
import {ProductResponse} from '@/types/product';
import {productApi} from '@/lib/api/products';
import {useCart} from '@/context/CartContext';

export function useProductDetail(productId: number) {
    const [product, setProduct] = useState<ProductResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const {addToCart} = useCart();

    useEffect(() => {
        loadProduct();
    }, [productId]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const data = await productApi.getById(productId);
            setProduct(data);
        } catch (err) {
            setError('Failed to load product');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (value: number) => {
        if (product) {
            const newQuantity = Math.max(1, Math.min(value, product.stockQuantity));
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, quantity);
    };

    return {
        product,
        loading,
        error,
        quantity,
        handleQuantityChange,
        handleAddToCart
    };
}