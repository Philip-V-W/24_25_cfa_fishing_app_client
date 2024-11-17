import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useCart} from '@/context/CartContext';
import {orderApi} from '@/lib/api/orders';
import {accountApi} from '@/lib/api/account';
import {Address} from '@/types/account';
import {OrderRequest} from '@/types/payment';

export function useCheckoutFlow() {
    const router = useRouter();
    const {cart, clearCart} = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<number | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                const fetchedAddresses = await accountApi.getAddresses();
                if (fetchedAddresses) {
                    setAddresses(fetchedAddresses);
                    const defaultAddress = fetchedAddresses.find(addr => addr.isDefault);
                    if (defaultAddress) {
                        setSelectedAddressId(defaultAddress.id);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch addresses:', err);
                setError('Failed to load shipping addresses. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            fetchAddresses();
        } else {
            router.push('/auth/login?redirect=/checkout');
        }
    }, [router]);

    const handlePaymentStart = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!selectedAddressId) {
                throw new Error('Please select a shipping address');
            }

            if (!cart.items.length) {
                throw new Error('Your cart is empty');
            }

            const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
            if (!selectedAddress) {
                throw new Error('Selected address not found');
            }

            const orderRequest: OrderRequest = {
                items: cart.items.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                })),
                shippingAddress: selectedAddress.streetAddress
            };

            const response = await orderApi.createOrder(orderRequest);

            if (!response?.clientSecret || !response?.orderId) {
                throw new Error('Invalid response from server');
            }

            setClientSecret(response.clientSecret);
            setOrderId(response.orderId);

        } catch (err) {
            console.error('Payment initialization error:', err);
            setError(err instanceof Error ? err.message : 'Failed to initialize payment');
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (confirmedOrderId: number, paymentIntentId: string) => {
        try {
            setLoading(true);
            await orderApi.confirmPayment(confirmedOrderId, paymentIntentId);
            clearCart();
            router.push('/checkout/success');
        } catch (err) {
            console.error('Payment confirmation error:', err);
            router.push('/checkout/cancel');
        } finally {
            setLoading(false);
        }
    };

    return {
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
    };
}