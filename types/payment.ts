export interface PaymentResponse {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
    currency: string;
    orderId: number;
}

export interface OrderRequest {
    shippingAddress?: number;
    items: {
        productId: number;
        quantity: number;
    }[];
}

export interface CreateCheckoutSessionRequest {
    items: {
        productId: number;
        quantity: number;
    }[];
}

export interface CheckoutSessionResponse {
    sessionUrl: string;
    sessionId: string;
}