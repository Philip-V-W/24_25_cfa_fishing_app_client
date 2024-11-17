import {fetchApi} from './config';
import {OrderRequest, OrderResponse, PaymentResponse} from '@/types/payment';
import {OrderStatus} from "@/types/order";

export const orderApi = {
    createOrder: async (request: OrderRequest): Promise<PaymentResponse> => {
        const response = await fetchApi<PaymentResponse>('/api/orders', {
            method: 'POST',
            body: JSON.stringify(request)
        });
        return response!;
    },

    confirmPayment: async (orderId: number, paymentIntentId: string): Promise<OrderResponse> => {
        const response = await fetchApi<OrderResponse>(`/api/orders/${orderId}/confirm-payment?paymentIntentId=${paymentIntentId}`, {
            method: 'POST'
        });
        return response!;
    },

    getAll: async () => {
        return await fetchApi<OrderResponse[]>('/api/orders');
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