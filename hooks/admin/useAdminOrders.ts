'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/context/AuthContext';
import {OrderResponse, OrderStatus} from '@/types/order';
import {orderApi} from '@/lib/api/orders';

export function useAdminOrders() {
    const {user, isAdmin} = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<OrderStatus | 'ALL'>('ALL');

    useEffect(() => {
        if (!user || !isAdmin) {
            router.push('/auth/login');
            return;
        }
        loadOrders();
    }, [user, isAdmin]);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await orderApi.getAllForAdmin();
            setOrders(data);
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to load orders';
            setError(errorMessage);
            if (errorMessage.includes('401') || errorMessage.includes('403')) {
                router.push('/auth/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
        try {
            await orderApi.updateStatus(orderId, newStatus);
            await loadOrders();
        } catch (err) {
            console.error('Error updating order status:', err);
        }
    };

    const filteredOrders = orders.filter(order =>
        filterStatus === 'ALL' || order.status === filterStatus
    );

    return {
        orders: filteredOrders,
        totalOrders: orders.length,
        loading,
        error,
        filterStatus,
        setFilterStatus,
        loadOrders,
        updateOrderStatus
    };
}