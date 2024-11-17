// types/payment.ts
export interface OrderRequest {
    items: OrderItemRequest[];
    shippingAddress: string;
}

export interface OrderItemRequest {
    productId: number;
    quantity: number;
}

export interface PaymentResponse {
    clientSecret: string;
    paymentIntentId: string;
    amount: number;
    currency: string;
    orderId: number;
}

export interface OrderResponse {
    id: number;
    customerEmail: string;
    orderDate: string;
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: string;
    trackingNumber: string | null;
    items: OrderItemResponse[];
}

export interface OrderItemResponse {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}