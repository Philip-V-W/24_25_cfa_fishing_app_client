'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {CategoryStats} from '@/types/admin';
import {categoryApi} from '@/lib/api/categories';

export function useAdminCategories() {
    const {user, isAdmin} = useAuth();
    const router = useRouter();
    const [categories, setCategories] = useState<CategoryStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !isAdmin) {
            router.push('/auth/login');
            return;
        }
        loadCategories();
    }, [user, isAdmin]);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const allCategories = await categoryApi.getAllWithStats();
            setCategories(allCategories);
            setError(null);
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        loading,
        error,
        loadCategories
    };
}