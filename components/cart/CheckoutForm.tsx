import React, {useState, useEffect} from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import {Button} from '@/components/ui/Button';

interface CheckoutFormProps {
    orderId: number;
    clientSecret: string;
    onPaymentSuccess: (orderId: number, paymentIntentId: string) => Promise<void>;
}

export function CheckoutForm({orderId, clientSecret, onPaymentSuccess}: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe || !clientSecret) return;

        stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    if (paymentIntent.id) {
                        onPaymentSuccess(orderId, paymentIntent.id);
                    }
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Please enter your payment details.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe, clientSecret, orderId, onPaymentSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            const {error, paymentIntent} = await stripe.confirmPayment({
                elements,
                redirect: 'if_required'
            });

            if (error) {
                setMessage(error.message ?? "An unexpected error occurred.");
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                await onPaymentSuccess(orderId, paymentIntent.id);
            }
        } catch (err) {
            setMessage("An unexpected error occurred.");
            console.error("Payment error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement/>

            {message && (
                <div className={`p-4 rounded-md ${
                    message.includes("succeeded")
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                }`}>
                    {message}
                </div>
            )}

            <Button
                variant="primary"
                className="w-full"
                type="submit"
                disabled={isLoading || !stripe || !elements}
            >
                {isLoading ? "Processing..." : "Pay now"}
            </Button>
        </form>
    );
}