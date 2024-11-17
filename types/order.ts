export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface OrderItemRequest {
    productId: number;
    quantity: number;
}

export interface OrderItemResponse {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export interface OrderRequest {
    shippingAddress: string;
    items: OrderItemRequest[];
}

export interface OrderResponse {
    id: number;
    customerEmail: string;
    orderDate: string;
    status: OrderStatus;
    totalAmount: number;
    shippingAddress: string;
    trackingNumber: string;
    items: OrderItemResponse[];
}

