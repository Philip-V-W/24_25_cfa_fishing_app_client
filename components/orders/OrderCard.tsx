'use client';

import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import type {OrderResponse} from '@/types/order';

const OrderStatusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    PROCESSING: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    SHIPPED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
};

interface OrderCardProps {
    order: OrderResponse;
    onCancel: (orderId: number) => Promise<void>;
}

export function OrderCard({order, onCancel}: OrderCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                    <div>
                        <div className="flex items-center space-x-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Order #{order.id}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                ${OrderStatusColors[order.status as keyof typeof OrderStatusColors]}`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                            ${order.totalAmount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.items.length} items
                        </p>
                    </div>
                </div>

                {/* Order Items */}
                <div className="mt-6 border-t dark:border-dark-border pt-6">
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center space-x-4"
                            >
                                <div className="flex-1">
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        Product ID: {item.productId}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p className="text-gray-900 dark:text-white font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Actions */}
                <div className="mt-6 border-t dark:border-dark-border pt-6">
                    <div className="flex justify-between items-center">
                        <div>
                            {order.shippingAddress && (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Shipping to: {order.shippingAddress}
                                </p>
                            )}
                        </div>
                        <div>
                            {order.status === 'PENDING' && (
                                <Button
                                    variant="outline"
                                    className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400"
                                    onClick={() => onCancel(order.id)}
                                >
                                    Cancel Order
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default OrderCard;