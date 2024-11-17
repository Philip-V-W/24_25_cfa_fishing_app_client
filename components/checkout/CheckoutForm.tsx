import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button} from "@/components/ui/Button";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();
    const [returnUrl, setReturnUrl] = useState('');

    useEffect(() => {
        setReturnUrl(`${window.location.origin}/checkout/success`);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements || !returnUrl) {
            return;
        }

        setProcessing(true);
        setError(null);

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: returnUrl,
            },
        });

        if (submitError) {
            setError(submitError.message || 'Payment failed');
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {error && (
                <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}
            <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={!stripe || processing || !returnUrl}
            >
                {processing ? 'Processing...' : 'Complete Payment'}
            </Button>
        </form>
    );
}