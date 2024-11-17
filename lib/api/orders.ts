import {fetchApi} from './config';
import type {OrderResponse, OrderRequest} from '@/types/order';
import {OrderStatus} from '@/types/order';

export const orderApi = {
    getAll: async () => {
        return await fetchApi<OrderResponse[]>('/api/orders');
    },

    createCheckoutOrder: async (request: OrderRequest) => {
        return await fetchApi<OrderResponse>('/api/orders', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {'Content-Type': 'application/json'}
        });
    },

    cancelOrder: async (orderId: number) => {
        return await fetchApi<void>(`/api/orders/${orderId}/cancel`, {
            method: 'POST'
        });
    },

    getOrderById: async (orderId: number) => {
        return await fetchApi<OrderResponse>(`/api/orders/${orderId}`);
    },

    getAllForAdmin: async (): Promise<OrderResponse[] | null> => {
        return await fetchApi<OrderResponse[] | null>('/api/admin/dashboard/orders');
    },

    updateStatus: async (orderId: number, status: OrderStatus): Promise<void> => {
        await fetchApi(`/api/admin/orders/${orderId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({status}),
            headers: {'Content-Type': 'application/json'}
        });
    }
};