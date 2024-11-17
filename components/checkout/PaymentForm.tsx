'use client';

import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {Button} from '@/components/ui/Button';

interface PaymentFormProps {
    onSuccess: (paymentIntentId: string) => Promise<void>;
}

export function PaymentForm({onSuccess}: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        setError(null);

        const result = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });

        if (result.error) {
            setError(result.error.message || 'Payment failed');
            setProcessing(false);
        } else if (result.paymentIntent) {
            await onSuccess(result.paymentIntent.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement/>
            {error && (
                <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}
            <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : 'Complete Payment'}
            </Button>
        </form>
    );
}