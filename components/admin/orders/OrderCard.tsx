import {Card} from '@/components/ui/Card';
import {OrderResponse, OrderStatus} from '@/types/order';
import {OrderItems} from './OrderItems';
import {OrderShipping} from './OrderShipping';
import {OrderActions} from './OrderActions';
import {getStatusColor} from '@/utils/orderUtils';

interface OrderCardProps {
    order: OrderResponse;
    onUpdateStatus: (orderId: number, newStatus: OrderStatus) => Promise<void>;
}

export function OrderCard({order, onUpdateStatus}: OrderCardProps) {
    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.customerEmail}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(order.orderDate).toLocaleString()}
                        </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                    </span>
                </div>

                <OrderItems items={order.items} total={order.totalAmount}/>
                <OrderShipping
                    address={order.shippingAddress}
                    trackingNumber={order.trackingNumber}
                />
                <OrderActions
                    orderId={order.id}
                    status={order.status}
                    onUpdateStatus={onUpdateStatus}
                />
            </div>
        </Card>
    );
}