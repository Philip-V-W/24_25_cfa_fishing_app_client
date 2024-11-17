'use client';

import {createContext, useContext, useReducer, useEffect, useState} from 'react';
import {ProductCategory, ProductResponse} from '@/types/product';
import {CartItem, CartState} from "@/types/cart";

type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: ProductResponse; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
    | { type: 'CLEAR_CART' };

interface CartContextType {
    cart: CartState;
    addToCart: (product: ProductResponse, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => {
        return sum + (Number(item.product.price) * item.quantity);
    }, 0);
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.product.id === action.payload.product.id
            );

            let newItems;
            if (existingItemIndex > -1) {
                newItems = state.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        const newQuantity = item.quantity + action.payload.quantity;
                        return {
                            ...item,
                            quantity: Math.min(newQuantity, item.product.stockQuantity)
                        };
                    }
                    return item;
                });
            } else {
                const quantity = Math.min(action.payload.quantity, action.payload.product.stockQuantity);
                newItems = [...state.items, {
                    product: action.payload.product,
                    quantity
                }];
            }

            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        }

        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.product.id !== action.payload);
            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        }

        case 'UPDATE_QUANTITY': {
            const newItems = state.items.map(item => {
                if (item.product.id === action.payload.productId) {
                    const newQuantity = Math.min(
                        action.payload.quantity,
                        item.product.stockQuantity
                    );
                    return {
                        ...item,
                        quantity: Math.max(1, newQuantity) // Ensure minimum quantity is 1
                    };
                }
                return item;
            });

            return {
                items: newItems,
                total: calculateTotal(newItems)
            };
        }

        case 'CLEAR_CART':
            return {
                items: [],
                total: 0
            };

        default:
            return state;
    }
}

export function CartProvider({children}: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, {items: [], total: 0});
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                try {
                    const parsedCart = JSON.parse(savedCart);
                    if (Array.isArray(parsedCart)) {
                        dispatch({type: 'CLEAR_CART'});
                        parsedCart.forEach((item) => {
                            dispatch({
                                type: 'ADD_ITEM',
                                payload: {
                                    product: {
                                        id: item.productId,
                                        name: item.name,
                                        price: item.price,
                                        stockQuantity: item.stockQuantity || 100,
                                        description: item.description || "",
                                        category: item.category || ProductCategory.ACCESSORIES,
                                        imageUrl: item.imageUrl || "",
                                        active: item.active || true
                                    },
                                    quantity: item.quantity
                                }
                            });
                        });
                    }
                } catch (error) {
                    console.error('Error loading cart:', error);
                }
            }
            setIsInitialized(true);
        }
    }, []);

    useEffect(() => {
        if (isInitialized) {
            const simplifiedCart = cart.items.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                name: item.product.name,
                price: item.product.price,
                description: item.product.description,
                category: item.product.category,
                imageUrl: item.product.imageUrl,
                stockQuantity: item.product.stockQuantity,
                active: item.product.active
            }));
            console.log('Updating localStorage with cart:', simplifiedCart);
            localStorage.setItem('cart', JSON.stringify(simplifiedCart));
        }
    }, [cart, isInitialized]);

    const addToCart = (product: ProductResponse, quantity: number) => {
        if (quantity <= 0) return;
        console.log('Adding to cart:', {product, quantity});
        dispatch({type: 'ADD_ITEM', payload: {product, quantity}});
    };

    const removeFromCart = (productId: number) => {
        console.log('Removing from cart:', productId);
        dispatch({type: 'REMOVE_ITEM', payload: productId});
    };

    const updateQuantity = (productId: number, quantity: number) => {
        console.log('Updating quantity:', {productId, quantity});
        dispatch({type: 'UPDATE_QUANTITY', payload: {productId, quantity}});
    };

    const clearCart = () => {
        console.log('Clearing cart');
        dispatch({type: 'CLEAR_CART'});
        localStorage.removeItem('cart');
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};