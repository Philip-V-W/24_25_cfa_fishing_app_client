'use client';

import {useState} from 'react';
import {categoryApi} from '@/lib/api/categories';

export function useAddCategory(onSuccess: () => void) {
    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) {
            setError('Category name is required');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await categoryApi.create(newCategoryName);
            onSuccess();
            handleClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create category');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setNewCategoryName('');
        setError(null);
    };

    return {
        showModal,
        newCategoryName,
        error,
        loading,
        setShowModal,
        setNewCategoryName,
        handleSubmit,
        handleClose
    };
}