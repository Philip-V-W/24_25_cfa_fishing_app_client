import {ProductResponse} from '@/types/product';

interface ProductHeaderProps {
    product: ProductResponse;
}

export function ProductHeader({product}: ProductHeaderProps) {
    return (
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                </p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded
                ${product.active
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}
            >
                {product.active ? 'Active' : 'Inactive'}
            </span>
        </div>
    );
}