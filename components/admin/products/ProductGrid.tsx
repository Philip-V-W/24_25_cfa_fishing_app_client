import {ProductResponse} from "@/types/product";
import {useState} from "react";
import {ProductCard} from "@/components/admin/products/ProductCard";

interface ProductGridProps {
    products: ProductResponse[];
    onToggleStatus: (productId: number, currentStatus: boolean) => Promise<void>;
}

export function ProductGrid({ products, onToggleStatus }: ProductGridProps) {
    const [selectedProduct, setSelectedProduct] = useState<ProductResponse | null>(null);

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No products found matching your filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onToggleStatus={onToggleStatus}
                    onEdit={setSelectedProduct}
                />
            ))}
        </div>
    );
}