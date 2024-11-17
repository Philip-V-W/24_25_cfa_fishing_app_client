'use client';

import {useRouter} from 'next/navigation';
import {useCart} from '@/context/CartContext';
import {CartItem} from '@/components/cart/CartItem';
import {EmptyCart} from '@/components/cart/EmptyCart';
import {Button} from '@/components/ui/Button';

export default function CartPage() {
    const router = useRouter();
    const {cart, removeFromCart, updateQuantity} = useCart();

    const handleProceedToCheckout = () => {
        router.push('/checkout');
    };

    if (!cart?.items || cart.items.length === 0) {
        return <EmptyCart/>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <CartItem
                            key={item.product.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                        />
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <div className="bg-white dark:bg-dark-card border dark:border-dark-border rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Order Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="text-gray-900 dark:text-white">
                                        ${cart.total.toFixed(2)}
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
                                            ${cart.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full mt-6"
                                onClick={handleProceedToCheckout}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}