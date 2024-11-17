import {ProductResponse} from '@/types/product';

interface ProductDetailsProps {
    product: ProductResponse;
}

export function ProductDetails({product}: ProductDetailsProps) {
    return (
        <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                <p className="font-medium text-gray-900 dark:text-white">
                    ${product.price}
                </p>
            </div>
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stock</p>
                <p className={`font-medium ${
                    product.stockQuantity === 0
                        ? 'text-red-600 dark:text-red-400'
                        : product.stockQuantity < 10
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-gray-900 dark:text-white'
                }`}>
                    {product.stockQuantity} units
                </p>
            </div>
        </div>
    );
}