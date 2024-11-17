import {useState, useEffect} from 'react';
import {orderApi} from '@/lib/api/orders';
import type {OrderResponse} from '@/types/order';

export function useOrders() {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const data = await orderApi.getAll();
            setOrders(data);
            setError(null);
        } catch (err) {
            setError('Failed to load orders');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const cancelOrder = async (orderId: number) => {
        if (!confirm('Are you sure you want to cancel this order?')) return;

        try {
            await orderApi.cancelOrder(orderId);
            await loadOrders();
        } catch (err) {
            console.error('Error cancelling order:', err);
            throw err;
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return {
        orders,
        loading,
        error,
        loadOrders,
        cancelOrder
    };
}