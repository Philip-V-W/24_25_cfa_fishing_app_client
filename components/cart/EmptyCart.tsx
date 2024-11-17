import Link from 'next/link';
import {Button} from "@/components/ui/Button";

export function EmptyCart() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Add some products to your cart to get started.
            </p>
            <Link href="/products">
                <Button variant="primary">
                    Continue Shopping
                </Button>
            </Link>
        </div>
    );
}