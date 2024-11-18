import {ProductCategory} from '@/types/product';
import {Button} from '@/components/ui/Button';

interface ProductFormProps {
    formData: {
        name: string;
        description: string;
        price: string;
        stockQuantity: string;
        category: string;
        imageUrl: string;
    };
    loading: boolean;
    error: string | null;
    onUpdate: (field: string, value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isEdit?: boolean;
}

export function ProductForm({
                                formData,
                                loading,
                                error,
                                onUpdate,
                                onSubmit,
                                onCancel,
                                isEdit = false
                            }: ProductFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => onUpdate('name', e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                             focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => onUpdate('description', e.target.value)}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                             focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Price
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => onUpdate('price', e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                                 bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                                 focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        value={formData.stockQuantity}
                        onChange={(e) => onUpdate('stockQuantity', e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                                 bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                                 focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                </label>
                <select
                    value={formData.category}
                    onChange={(e) => onUpdate('category', e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                             focus:border-primary-500 focus:ring-primary-500"
                >
                    <option value="">Select a category</option>
                    {Object.values(ProductCategory).map((category) => (
                        <option key={category} value={category}>
                            {category.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image URL
                </label>
                <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => onUpdate('imageUrl', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-dark-border
                             bg-white dark:bg-dark-bg px-3 py-2 text-gray-900 dark:text-white
                             focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <div className="flex justify-end space-x-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                </Button>
            </div>
        </form>
    );
}