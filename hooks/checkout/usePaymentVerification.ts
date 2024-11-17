'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {useCart} from '@/context/CartContext';
import {paymentApi} from '@/lib/api/payment';

export function usePaymentVerification() {
    const searchParams = useSearchParams();
    const {clearCart} = useCart();

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
            verifyPayment(sessionId);
        }
    }, [searchParams]);

    const verifyPayment = async (sessionId: string) => {
        try {
            await paymentApi.verifyPayment(sessionId);
            clearCart();
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    };
}