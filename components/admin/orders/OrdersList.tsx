import {OrderResponse, OrderStatus} from '@/types/order';
import {OrderCard} from './OrderCard';

interface OrdersListProps {
    orders: OrderResponse[];
    onUpdateStatus: (orderId: number, newStatus: OrderStatus) => Promise<void>;
}

export function OrdersList({orders, onUpdateStatus}: OrdersListProps) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    No orders found for the selected filter.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                />
            ))}
        </div>
    );
}