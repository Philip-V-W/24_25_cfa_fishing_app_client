'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useCart} from '@/context/CartContext';
import {useAuth} from '@/context/AuthContext';
import {useCheckout} from '@/hooks/checkout/useCheckout';
import {paymentApi} from '@/lib/api/payment';
import {Address} from "@/types/account";

export function useCheckoutFlow() {
    const router = useRouter();
    const {cart, clearCart} = useCart();
    const {user} = useAuth();
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<number | null>(null);
    const {createOrder} = useCheckout(cart);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            router.push('/auth/login?redirect=/checkout');
            return;
        }
        if (cart.items.length === 0) {
            router.push('/cart');
        }
    }, [user, cart.items.length, router]);

    const handlePaymentStart = async () => {
        if (!selectedAddress) {
            setError('Please select a shipping address');
            return;
        }

        try {
            const response = await createOrder(selectedAddress.id);
            setClientSecret(response.clientSecret);
            setOrderId(response.orderId);
        } catch (err) {
            console.error('Payment initialization error:', err);
        }
    };

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        if (!orderId) return;

        try {
            await paymentApi.confirmPayment(orderId, paymentIntentId);
            clearCart();
            router.push('/checkout/success');
        } catch (err) {
            console.error('Payment confirmation error:', err);
            router.push('/checkout/cancel');
        }
    };

    return {
        user,
        cart,
        error,
        clientSecret,
        selectedAddress,
        setSelectedAddress,
        handlePaymentStart,
        handlePaymentSuccess
    };
}