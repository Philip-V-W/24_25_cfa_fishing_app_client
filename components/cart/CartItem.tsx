import {Card} from "@/components/ui/Card";
import Link from 'next/link';
import type {CartItem} from '@/types/cart';

interface CartItemProps {
    item: CartItem;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export function CartItem({item, onUpdateQuantity, onRemove}: CartItemProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-4 flex items-center">
                <img
                    src={`/images/products/${item.product.imageUrl}`}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                    <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 dark:text-white
                                 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                        {item.product.name}
                    </Link>
                    <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        ${item.product.price}
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 dark:border-dark-border rounded-lg">
                        <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 dark:text-gray-400
                                     hover:text-primary-600 dark:hover:text-primary-400"
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-4 py-1 text-gray-900 dark:text-white">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 dark:text-gray-400
                                     hover:text-primary-600 dark:hover:text-primary-400"
                            disabled={item.quantity >= item.product.stockQuantity}
                        >
                            +
                        </button>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                    </span>
                    <button
                        onClick={() => onRemove(item.product.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700
                                 dark:hover:text-red-500"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </Card>
    );
}