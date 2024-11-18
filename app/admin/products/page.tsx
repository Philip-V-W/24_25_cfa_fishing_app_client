'use client';

import {useState} from 'react';
import {ProductFilters} from '@/components/admin/products/ProductFilters';
import {ProductGrid} from '@/components/admin/products/ProductGrid';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {ErrorDisplay} from '@/components/ui/ErrorDisplay';
import {PageHeader} from '@/components/admin/products/PageHeader';
import {useAdminProducts} from '@/hooks/admin/useAdminProducts';
import {ProductCategory, ProductResponse} from '@/types/product';
import {Modal} from '@/components/ui/Modal';
import {ProductForm} from "@/components/admin/products/ProductForm";

export default function AdminProductsPage() {
    const {
        products,
        loading,
        error,
        filters,
        setFilters,
        loadProducts,
        toggleProductStatus,
        updateProduct
    } = useAdminProducts();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        imageUrl: ''
    });

    // Add this function
    const handleEdit = (product: ProductResponse) => {
        setSelectedProduct(product);
        setEditFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stockQuantity: product.stockQuantity.toString(),
            category: product.category,
            imageUrl: product.imageUrl
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;

        try {
            setIsSubmitting(true);
            setFormError(null);

            await updateProduct(selectedProduct.id, {
                name: editFormData.name,
                description: editFormData.description,
                price: parseFloat(editFormData.price),
                stockQuantity: parseInt(editFormData.stockQuantity),
                category: editFormData.category as ProductCategory,
                imageUrl: editFormData.imageUrl
            });

            setSelectedProduct(null);
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Failed to update product');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="space-y-8">
            <PageHeader/>

            <ProductFilters
                filters={filters}
                onUpdateFilters={setFilters}
            />

            {error ? (
                <ErrorDisplay error={error} onRetry={loadProducts}/>
            ) : (
                <ProductGrid
                    products={products}
                    onToggleStatus={toggleProductStatus}
                    onEdit={handleEdit}
                />
            )}

            {selectedProduct && (
                <Modal
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    title="Edit Product"
                >
                    <ProductForm
                        formData={editFormData}
                        loading={isSubmitting}
                        error={formError}
                        onUpdate={(field, value) =>
                            setEditFormData(prev => ({...prev, [field]: value}))
                        }
                        onSubmit={handleSubmit}
                        onCancel={() => setSelectedProduct(null)}
                        isEdit={true}
                    />
                </Modal>
            )}
        </div>
    );
}