import Link from "next/link";

interface ProductBreadcrumbProps {
    category: string;
    productName: string;
}

export function ProductBreadcrumb({category, productName}: ProductBreadcrumbProps) {
    return (
        <div className="text-sm text-gray-600 dark:text-gray-400">
            <Link href="/products" className="hover:text-primary-600 dark:hover:text-primary-400">
                Products
            </Link>
            <span className="mx-2">/</span>
            <Link
                href={`/products/category/${category}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
            >
                {category.replace('_', ' ')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 dark:text-white">{productName}</span>
        </div>
    );
}