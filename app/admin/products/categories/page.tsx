'use client';

import {useState} from 'react';
import {CategoryGrid} from '@/components/admin/categories/CategoryGrid';
import {CategoryStats} from '@/components/admin/categories/CategoryStats';
import {AddCategoryModal} from '@/components/admin/categories/AddCategoryModal';
import {PageHeader} from '@/components/admin/categories/PageHeader';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {ErrorDisplay} from '@/components/ui/ErrorDisplay';
import {useAdminCategories} from '@/hooks/admin/useAdminCategories';
import {useAddCategory} from '@/hooks/admin/useAddCategory';
import {Button} from "@/components/ui/Button";

export default function AdminCategoriesPage() {
    const {categories, loading, error, loadCategories} = useAdminCategories();
    const {
        showModal,
        newCategoryName,
        error: modalError,
        loading: modalLoading,
        setShowModal,
        setNewCategoryName,
        handleSubmit,
        handleClose
    } = useAddCategory(loadCategories);

    const [selectedCategory, setSelectedCategory] = useState<CategoryStats | null>(null);

    const handleManageCategory = (category: CategoryStats) => {
        setSelectedCategory(category);
    };

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="space-y-8">
            <PageHeader onAddCategory={() => setShowModal(true)}/>

            {error ? (
                <ErrorDisplay error={error} onRetry={loadCategories}/>
            ) : (
                <CategoryGrid
                    categories={categories}
                    onManageCategory={handleManageCategory}
                    onAddCategory={() => setShowModal(true)}
                />
            )}

            <CategoryStats categories={categories}/>

            {categories.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                        No categories found. Create your first category to get started.
                    </p>
                    <Button
                        variant="primary"
                        className="mt-4"
                        onClick={() => setShowModal(true)}
                    >
                        Add Category
                    </Button>
                </div>
            )}

            <AddCategoryModal
                isOpen={showModal}
                onClose={handleClose}
                onSubmit={handleSubmit}
                categoryName={newCategoryName}
                onCategoryNameChange={setNewCategoryName}
                error={modalError}
                loading={modalLoading}
            />
        </div>
    );
}