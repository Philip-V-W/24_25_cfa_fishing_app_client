import { useState } from 'react';
import { orderApi } from '@/lib/api/orders';
import { paymentApi } from '@/lib/api/payment';
import {OrderRequest} from "@/types/payment";

export function useCartCheckout() {
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const handleCheckout = async (orderItems: OrderRequest) => {
        try {
            setLoading(true);

            const order = await orderApi.createCheckoutOrder(orderItems);
            const paymentData = await paymentApi.createPaymentIntent(order.orderId);

            setClientSecret(paymentData.clientSecret);
        } catch (error) {
            console.error('Checkout error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        clientSecret,
        handleCheckout
    };
}