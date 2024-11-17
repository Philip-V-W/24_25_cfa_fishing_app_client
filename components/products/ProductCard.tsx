import {type ProductResponse} from '@/types/product';

interface ProductCardProps {
    product: ProductResponse;
}

export const ProductCard = ({product}: ProductCardProps) => {
    const outOfStock = product.stockQuantity <= 0;

    return (
        <div className={`rounded-lg border p-4 shadow bg-white dark:bg-dark-card 
            ${outOfStock ? 'opacity-75' : ''}`}
        >
            <div className="relative">
                {product.imageUrl && (
                    <img
                        src={`/images/products/${product.imageUrl}`}
                        alt={product.name}
                        className="h-80 w-full object-cover rounded-lg"
                    />
                )}
                {outOfStock && (
                    <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full
                            bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        ${product.price}
                    </span>
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                            outOfStock ? 'bg-red-500' : 'bg-green-500'
                        }`}/>
                        <span className={`text-sm font-medium ${
                            outOfStock
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-green-600 dark:text-green-400'
                        }`}>
                            {outOfStock
                                ? 'Out of Stock'
                                : `${product.stockQuantity} in stock`}
                        </span>
                    </div>
                </div>
                {/*<div className="mt-2">*/}
                {/*    <span className="text-sm inline-flex items-center px-3 py-1 rounded-full*/}
                {/*                     bg-primary-100 text-primary-800 dark:bg-primary-900/30*/}
                {/*                     dark:text-primary-400 font-medium">Category: {product.category}</span>*/}
                {/*    {!product.active && (*/}
                {/*        <span className="ml-2 text-sm text-red-500">(Inactive)</span>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};