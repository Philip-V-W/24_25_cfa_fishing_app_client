'use client';

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {ShippingForm} from '@/components/checkout/ShippingForm';
import {CheckoutSummary} from '@/components/checkout/CheckoutSummary';
import {CheckoutForm} from "@/components/cart/CheckoutForm";
import {useCheckoutFlow} from '@/hooks/checkout/useCheckoutFlow';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const {
        cart,
        loading,
        error,
        clientSecret,
        orderId,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        handlePaymentStart,
        handlePaymentSuccess
    } = useCheckoutFlow();

    if (cart.items.length === 0) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Checkout
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white dark:bg-dark-card border dark:border-dark-border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Shipping Address
                        </h2>
                        <ShippingForm
                            addresses={addresses}
                            selectedAddressId={selectedAddressId}
                            onAddressSelect={setSelectedAddressId}
                        />
                    </Card>

                    <Card className="bg-white dark:bg-dark-card border dark:border-dark-border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Payment
                        </h2>
                        {clientSecret && orderId ? (
                            <Elements stripe={stripePromise} options={{clientSecret}}>
                                <CheckoutForm
                                    orderId={orderId}
                                    clientSecret={clientSecret}
                                    onPaymentSuccess={handlePaymentSuccess}
                                />
                            </Elements>
                        ) : (
                            <>
                                {error && (
                                    <div
                                        className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                                        {error}
                                    </div>
                                )}
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={handlePaymentStart}
                                    disabled={loading || !selectedAddressId}
                                >
                                    {loading ? 'Processing...' : 'Proceed to Payment'}
                                </Button>
                            </>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <CheckoutSummary
                        cart={cart}
                        loading={loading}
                        showPaymentButton={!clientSecret}
                        onCheckout={handlePaymentStart}
                    />
                </div>
            </div>
        </div>
    );
}