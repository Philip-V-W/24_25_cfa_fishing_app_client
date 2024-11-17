import {OrderResponse} from "@/types/order";

interface OrderItemsProps {
    items: OrderResponse['items'];
    total: number;
}

export function OrderItems({ items, total }: OrderItemsProps) {
    return (
        <div className="mt-4">
            <div className="bg-gray-50 dark:bg-dark-bg rounded-lg p-4">
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-900 dark:text-white">
                                    {item.quantity}x
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                    {item.productName}
                                </span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">
                                ${item.subtotal.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t dark:border-dark-border flex justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                        ${total.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}