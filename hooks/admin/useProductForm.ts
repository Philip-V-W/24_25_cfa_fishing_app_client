'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {productApi} from '@/lib/api/products';

interface ProductFormData {
    name: string;
    description: string;
    price: string;
    stockQuantity: string;
    category: string;
    imageUrl: string;
}

export function useProductForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        imageUrl: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            await productApi.create({
                ...formData,
                price: parseFloat(formData.price),
                stockQuantity: parseInt(formData.stockQuantity),
            });

            router.push('/admin/products');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create product');
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: keyof ProductFormData, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    return {
        formData,
        loading,
        error,
        updateField,
        handleSubmit,
        handleCancel: () => router.back()
    };
}