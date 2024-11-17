'use client';

import {useState} from 'react';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import Link from 'next/link';
import {OrderCard} from '@/components/orders/OrderCard';
import {useOrders} from '@/hooks/useOrders';
import {LoadingSpinner} from "@/components/ui/LoadingSpinner";

export default function OrdersPage() {
    const {orders, loading, error, loadOrders, cancelOrder} = useOrders();
    const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

    const filteredOrders = selectedStatus === 'ALL'
        ? orders
        : orders.filter(order => order.status === selectedStatus);

    if (loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        My Orders
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        View and track your orders
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-dark-border
                               bg-white dark:bg-dark-card px-3 py-2 text-gray-900 dark:text-white"
                    >
                        <option value="ALL">All Orders</option>
                        <option value="PENDING">Pending</option>
                        <option value="PAID">Paid</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                    <Button variant="outline" onClick={loadOrders}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Orders List */}
            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <Button variant="outline" onClick={loadOrders}>
                        Retry
                    </Button>
                </div>
            ) : filteredOrders.length === 0 ? (
                <Card className="bg-white dark:bg-dark-card border dark:border-dark-border p-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedStatus === 'ALL'
                            ? "You haven't placed any orders yet."
                            : `No ${selectedStatus.toLowerCase()} orders found.`}
                    </p>
                    <Link href="/products">
                        <Button variant="primary">
                            Shop Now
                        </Button>
                    </Link>
                </Card>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onCancel={cancelOrder}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}