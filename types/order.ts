export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface OrderRequest {
    items: {
        productId: number;
        quantity: number;
    }[];
    shippingAddress: string; // Changed from object to string
}

export interface OrderItemRequest {
    productId: number;
    quantity: number;
}

export interface PaymentResponse {
    clientSecret: string;
    orderId: number;
    paymentIntentId: string;
}

export interface OrderResponse {
    id: number;
    orderDate: string;
    status: string;
    totalAmount: number;
    items: OrderItemResponse[];
    shippingAddress?: string;
}

export interface OrderItemResponse {
    id: number;
    productId: number;
    quantity: number;
    price: number;
}