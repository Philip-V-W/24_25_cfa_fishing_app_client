'use client';

import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {CartState} from '@/types/cart';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CheckoutForm} from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface OrderSummaryProps {
    cart: CartState;
    clientSecret: string | null;
    loading: boolean;
    onCheckout: () => Promise<void>;
    onPaymentSuccess: () => void;
}

export function OrderSummary({cart, clientSecret, loading, onCheckout, onPaymentSuccess}: OrderSummaryProps) {
    const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border sticky top-8">
            <div className="p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order Summary
                </h2>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="text-gray-900 dark:text-white">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Items</span>
                        <span className="text-gray-900 dark:text-white">
                            {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    </div>
                    <div className="pt-4 border-t dark:border-dark-border">
                        <div className="flex justify-between text-lg font-semibold">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-primary-600 dark:text-primary-400">
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {clientSecret ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm clientSecret={clientSecret} onPaymentSuccess={onPaymentSuccess} />
                    </Elements>
                ) : (
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={onCheckout}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Proceed to Checkout'}
                    </Button>
                )}
            </div>
        </Card>
    );
}