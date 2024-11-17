'use client';

import {ProductForm} from '@/components/admin/products/ProductForm';
import {useProductForm} from '@/hooks/admin/useProductForm';

export default function AddProductPage() {
    const {
        formData,
        loading,
        error,
        updateField,
        handleSubmit,
        handleCancel
    } = useProductForm();

    return (
        <div className="max-w-3xl mx-auto py-8">
            <ProductForm
                formData={formData}
                loading={loading}
                error={error}
                onUpdate={updateField}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
}