'use client';

import {useCart} from '@/context/CartContext';
import {CartItem} from '@/components/cart/CartItem';
import {OrderSummary} from '@/components/cart/OrderSummary';
import {EmptyCart} from '@/components/cart/EmptyCart';
import {useCartCheckout} from '@/hooks/cart/useCartCheckout';
import {useState} from 'react';

export default function CartPage() {
    const {cart, removeFromCart, updateQuantity, clearCart} = useCart();
    const {loading, clientSecret, handleCheckout} = useCartCheckout();
    const [error, setError] = useState<string | null>(null);

    const onCheckout = async () => {
        try {
            setError(null);
            const orderItems = cart.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }));

            await handleCheckout({items: orderItems});
        } catch (err) {
            setError('Failed to process checkout. Please try again.');
            console.error('Checkout error:', err);
        }
    };

    const onPaymentSuccess = () => {
        clearCart();
        window.location.href = '/checkout/success';
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

                <div>
                    {error && (
                        <div className="mb-4 text-red-500">
                            {error}
                        </div>
                    )}
                    <OrderSummary
                        cart={cart}
                        clientSecret={clientSecret}
                        loading={loading}
                        onCheckout={onCheckout}
                        onPaymentSuccess={onPaymentSuccess}
                    />
                </div>
            </div>
        </div>
    );
}