import {Button} from '@/components/ui/Button';
import {OrderStatus} from '@/types/order';

interface OrderActionsProps {
    orderId: number;
    status: OrderStatus;
    onUpdateStatus: (orderId: number, newStatus: OrderStatus) => Promise<void>;
}

export function OrderActions({orderId, status, onUpdateStatus}: OrderActionsProps) {
    return (
        <div className="mt-6 flex items-center justify-end space-x-4">
            {status === OrderStatus.PENDING && (
                <>
                    <Button
                        variant="outline"
                        className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400"
                        onClick={() => onUpdateStatus(orderId, OrderStatus.CANCELLED)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => onUpdateStatus(orderId, OrderStatus.PROCESSING)}
                    >
                        Process
                    </Button>
                </>
            )}
            {status === OrderStatus.PROCESSING && (
                <Button
                    variant="primary"
                    onClick={() => onUpdateStatus(orderId, OrderStatus.SHIPPED)}
                >
                    Mark as Shipped
                </Button>
            )}
            {status === OrderStatus.SHIPPED && (
                <Button
                    variant="primary"
                    onClick={() => onUpdateStatus(orderId, OrderStatus.DELIVERED)}
                >
                    Mark as Delivered
                </Button>
            )}
        </div>
    );
}