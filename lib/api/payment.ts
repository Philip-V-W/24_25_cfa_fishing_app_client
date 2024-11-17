import {fetchApi} from './config';
import {CreateCheckoutSessionRequest, PaymentResponse} from '@/types/payment';
import {OrderResponse} from "@/types/order";

export const paymentApi = {
    confirmPayment: async (orderId: number, paymentIntentId: string) => {
        return await fetchApi<OrderResponse>(`/api/orders/${orderId}/confirm-payment`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ paymentIntentId })
        });
    },

    createCheckoutSession: async (request: CreateCheckoutSessionRequest) => {
        return await fetchApi('/api/checkout/create-session', {
            method: 'POST',
            body: JSON.stringify({
                items: request.items,
                shippingAddressId: (request as any).shippingAddressId
            }),
        });
    },

    verifyPayment: async (sessionId: string) => {
        return await fetchApi(`/api/checkout/verify/${sessionId}`, {
            method: 'POST',
        });
    },

    createPaymentIntent: (orderId: number) =>
        fetchApi<PaymentResponse>(`/api/payments/create-intent/${orderId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }),
};