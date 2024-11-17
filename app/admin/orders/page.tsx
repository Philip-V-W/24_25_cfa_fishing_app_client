'use client';

import {OrderHeader} from '@/components/admin/orders/OrderHeader';
import {OrderFilters} from '@/components/admin/orders/OrderFilters';
import {OrdersList} from '@/components/admin/orders/OrdersList';
import {LoadingSpinner} from '@/components/ui/LoadingSpinner';
import {Button} from '@/components/ui/Button';
import {useAdminOrders} from '@/hooks/admin/useAdminOrders';

export default function AdminOrdersPage() {
    const {
        orders,
        totalOrders,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        loadOrders,
        updateOrderStatus
    } = useAdminOrders();

    if (loading) return <LoadingSpinner/>;

    return (
        <div className="space-y-8">
            <OrderHeader
                totalOrders={totalOrders}
                onRefresh={loadOrders}
            />

            <OrderFilters
                currentFilter={filterStatus}
                onFilterChange={setFilterStatus}
            />

            {error ? (
                <div className="text-center py-12">
                    <p className="text-red-500 dark:text-red-400">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={loadOrders}>
                        Retry
                    </Button>
                </div>
            ) : (
                <OrdersList
                    orders={orders}
                    onUpdateStatus={updateOrderStatus}
                />
            )}
        </div>
    );
}