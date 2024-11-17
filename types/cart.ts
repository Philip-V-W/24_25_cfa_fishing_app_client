import {ProductResponse} from "@/types/product";

export interface CartItem {
    product: ProductResponse;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    total: number;
}

export interface CartTotals {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
}