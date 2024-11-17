import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/lib/api/config';
import { OrderRequest } from '@/types/order';
import { PaymentResponse } from '@/types/payment';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutState {
    loading: boolean;
    error: string | null;
    clientSecret: string | null;
    orderId: number | null;
}

export function useCheckout() {
    const router = useRouter();
    const { cart, clearCart } = useCart();
    const [state, setState] = useState<CheckoutState>({
        loading: false,
        error: null,
        clientSecret: null,
        orderId: null
    });

    const createOrder = async (shippingAddress: string): Promise<void> => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            const orderRequest: OrderRequest = {
                shippingAddress,
                items: cart.items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            const response = await fetchApi<PaymentResponse>('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderRequest)
            });

            if (!response) throw new Error('Failed to create order');

            setState(prev => ({
                ...prev,
                clientSecret: response.clientSecret,
                orderId: response.orderId
            }));

        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Error creating order'
            }));
            throw error;
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));

            if (!state.orderId) {
                throw new Error('No order ID found');
            }

            await fetchApi(`/api/orders/${state.orderId}/confirm-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentIntentId })
            });

            clearCart();
            router.push('/checkout/success');
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Error confirming payment'
            }));
            router.push('/checkout/cancel');
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const getPaymentOptions = (): StripeElementsOptions | null => {
        if (!state.clientSecret) return null;

        return {
            clientSecret: state.clientSecret,
            appearance: {
                theme: 'stripe',
                labels: 'floating'
            },
        };
    };

    return {
        ...state,
        stripe: stripePromise,
        createOrder,
        handlePaymentSuccess,
        getPaymentOptions,
    };
}