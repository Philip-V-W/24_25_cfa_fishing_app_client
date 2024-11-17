'use client';

import {useRouter} from 'next/navigation';
import {Card} from "@/components/ui/Card";
import {Button} from "@/components/ui/Button";
import {usePaymentVerification} from '@/hooks/checkout/usePaymentVerification';

export default function CheckoutSuccessPage() {
    const router = useRouter();
    usePaymentVerification();

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-white dark:bg-dark-card
                         border dark:border-dark-border text-center p-8">
                <div className="mx-auto w-16 h-16 flex items-center justify-center
                            rounded-full bg-green-100 dark:bg-green-900/30">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Payment Successful!
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Thank you for your purchase. Your order has been processed successfully.
                </p>
                <Button
                    variant="primary"
                    className="mt-8 w-full"
                    onClick={() => router.push('/account/orders')}
                >
                    View Orders
                </Button>
                <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => router.push('/products')}
                >
                    Continue Shopping
                </Button>
            </Card>
        </div>
    );
}