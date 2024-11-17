'use client';

import {useRouter} from 'next/navigation';
import {CheckoutStatusCard} from '@/components/checkout/CheckoutStatusCard';

export default function CheckoutCancelPage() {
    const router = useRouter();

    return (
        <CheckoutStatusCard
            icon={
                <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            }
            title="Payment Cancelled"
            message="Your payment was cancelled. No charges were made."
            primaryButton={{
                label: "Return to Cart",
                onClick: () => router.push('/cart')
            }}
            secondaryButton={{
                label: "Continue Shopping",
                onClick: () => router.push('/products')
            }}
        />
    );
}