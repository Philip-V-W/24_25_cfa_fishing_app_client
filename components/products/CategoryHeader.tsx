import {ProductCategory} from '@/types/product';
import {categoryDescriptions} from '@/constants/categories';
import Link from "next/link";

interface CategoryHeaderProps {
    category: ProductCategory;
}

export function CategoryHeader({category}: CategoryHeaderProps) {
    return (
        <div className="relative bg-gray-900 dark:bg-black py-24 px-6 sm:py-32 rounded-xl overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/images/hero-fishing.jpg"
                    alt={category}
                    className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-black/50"/>
            </div>
            <div className="relative mx-auto max-w-2xl text-center">
                <div className="mb-4">
                    <Link
                        href="/products"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Products
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-white">
                        {category.replace('_', ' ')}
                    </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    {category.replace('_', ' ')}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    {categoryDescriptions[category]}
                </p>
            </div>
        </div>
    );
}