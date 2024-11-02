import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Card } from './Card';

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
    };
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="group">
            <Link href={`/products/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-dark-bg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                    </p>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        </Card>
    );
}