import {Card} from '@/components/ui/Card';
import {ProductResponse} from '@/types/product';
import {ProductHeader} from './card/ProductHeader';
import {ProductDetails} from './card/ProductDetails';
import {ProductActions} from './card/ProductActions';

interface ProductCardProps {
    product: ProductResponse;
    onToggleStatus: (productId: number, currentStatus: boolean) => Promise<void>;
    onEdit: (product: ProductResponse) => void;
}

export function ProductCard({product, onToggleStatus, onEdit}: ProductCardProps) {
    return (
        <Card className={`bg-white dark:bg-dark-card border dark:border-dark-border 
            ${!product.active ? 'opacity-75' : ''}`}>
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={`/images/products/${product.imageUrl}`}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                />
            </div>
            <div className="p-6">
                <ProductHeader product={product}/>
                <ProductDetails product={product}/>
                <ProductActions
                    product={product}
                    onToggleStatus={onToggleStatus}
                    onEdit={onEdit}
                />
            </div>
        </Card>
    );
}