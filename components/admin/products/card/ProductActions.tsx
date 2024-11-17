import {Button} from '@/components/ui/Button';
import {ProductResponse} from '@/types/product';
import {useState} from 'react';
import {ErrorDisplay} from '@/components/ui/ErrorDisplay';

interface ProductActionsProps {
    product: ProductResponse;
    onToggleStatus: (productId: number, currentStatus: boolean) => Promise<void>;
    onEdit: (product: ProductResponse) => void;
}

export function ProductActions({product, onToggleStatus, onEdit}: ProductActionsProps) {
    const [isToggling, setIsToggling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggleStatus = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            setIsToggling(true);
            setError(null);
            await onToggleStatus(product.id, product.active);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update status');
            console.error('Error toggling status:', err);
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <div className="mt-6 flex flex-col space-y-2">
            <div className="flex items-center justify-end space-x-4">
                <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => onEdit(product)}
                >
                    Edit
                </Button>
                <Button
                    variant={product.active ? 'outline' : 'primary'}
                    className={`text-sm ${
                        product.active
                            ? 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-400'
                            : ''
                    }`}
                    onClick={handleToggleStatus}
                    disabled={isToggling}
                >
                    {isToggling ? 'Processing...' : product.active ? 'Deactivate' : 'Activate'}
                </Button>
            </div>
            {error && <ErrorDisplay message={error} className="mt-2"/>}
        </div>
    );
}