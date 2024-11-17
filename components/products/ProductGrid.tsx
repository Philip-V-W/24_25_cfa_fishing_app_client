import {ProductCard} from "@/components/products/ProductCard";
import {ProductCategory, ProductResponse} from "@/types/product";
import Link from "next/link";

interface ProductGridProps {
    products: ProductResponse[];
}

export function ProductGrid({products}: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Link key={product.id} href={{
                    pathname: `/products/${product.id}`,
                    query: {
                        category: product.category || ProductCategory.ACCESSORIES,
                        description: product.description || "",
                        active: true,
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        stockQuantity: product.stockQuantity,
                        imageUrl: product.imageUrl
                    }
                }}>
                    <ProductCard product={product}/>
                </Link>
            ))}
        </div>
    );
}