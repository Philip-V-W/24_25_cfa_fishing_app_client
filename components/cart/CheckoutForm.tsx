'use client';

import {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {Button} from "@/components/ui/Button";

interface CheckoutFormProps {
    clientSecret: string;
    onPaymentSuccess: (paymentIntentId: string) => Promise<void>;
}

export function CheckoutForm({clientSecret, onPaymentSuccess}: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        setError(null);

        try {
            const {error: submitError, paymentIntent} = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/checkout/success`,
                },
                redirect: 'if_required'
            });

            if (submitError) {
                throw submitError;
            }

            if (paymentIntent && paymentIntent.status === 'succeeded') {
                await onPaymentSuccess(paymentIntent.id);
            }
        } catch (err) {
            console.error('Payment error:', err);
            setError(err instanceof Error ? err.message : 'Payment failed');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement/>

            {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={!stripe || processing}
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </Button>
        </form>
    );
}