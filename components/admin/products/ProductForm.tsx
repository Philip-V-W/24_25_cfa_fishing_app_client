import {ProductCategory} from '@/types/product';
import {Card} from '@/components/ui/Card';
import {Button} from '@/components/ui/Button';
import {Input} from '@/components/ui/Input';
import {Select} from '@/components/ui/Select';

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
}

export function ProductForm({
                                formData,
                                loading,
                                error,
                                onUpdate,
                                onSubmit,
                                onCancel
                            }: ProductFormProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Add New Product
                </h1>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </label>
                        <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => onUpdate('name', e.target.value)}
                            required
                            className="mt-1"
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
                            className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600
                                     bg-white dark:bg-gray-800 px-3 py-2 text-sm
                                     focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price
                            </label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => onUpdate('price', e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Stock Quantity
                            </label>
                            <Input
                                type="number"
                                value={formData.stockQuantity}
                                onChange={(e) => onUpdate('stockQuantity', e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category
                        </label>
                        <Select
                            value={formData.category}
                            onChange={(e) => onUpdate('category', e.target.value)}
                            required
                            className="mt-1"
                        >
                            <option value="">Select a category</option>
                            {Object.values(ProductCategory).map((category) => (
                                <option key={category} value={category}>
                                    {category.replace(/_/g, ' ')}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Image URL
                        </label>
                        <Input
                            type="url"
                            value={formData.imageUrl}
                            onChange={(e) => onUpdate('imageUrl', e.target.value)}
                            className="mt-1"
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
                            {loading ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
