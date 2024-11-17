import {CartState} from "@/types/cart";
import {Card} from "@/components/ui/Card";

interface OrderSummaryProps {
    cart: CartState;
    loading?: boolean;
    showPaymentButton: boolean;
    onCheckout: () => Promise<void>;
}

export function CheckoutSummary({cart}: OrderSummaryProps) {
    const subtotal = cart.items.reduce((total, item) =>
        total + (item.product.price * item.quantity), 0);
    const shippingCost = subtotal >= 100 ? 0 : 10;
    const total = subtotal + shippingCost;

    return (
        <Card className="bg-white dark:bg-dark-card border dark:border-dark-border sticky top-8">
            <div className="p-6 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Checkout Summary
                </h2>

                <div className="space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.product.id} className="flex justify-between">
                            <div className="flex-1">
                                <span className="text-gray-900 dark:text-white">
                                    {item.product.name}
                                </span>
                                <div className="text-gray-600 dark:text-gray-400">
                                    Qty: {item.quantity}
                                </div>
                            </div>
                            <span className="text-gray-900 dark:text-white">
                                ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="text-gray-900 dark:text-white">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                        <span className="text-gray-900 dark:text-white">
                            {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
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

                {subtotal < 100 && (
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                        Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                    </div>
                )}
            </div>
        </Card>
    );
}