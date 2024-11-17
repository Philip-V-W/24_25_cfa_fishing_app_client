import { OrderStatus } from '@/types/order';

export const getStatusColor = (status: OrderStatus) => {
    switch (status) {
        case OrderStatus.PENDING:
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        case OrderStatus.PROCESSING:
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
        case OrderStatus.SHIPPED:
            return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        case OrderStatus.DELIVERED:
            return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400';
        case OrderStatus.CANCELLED:
            return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
};