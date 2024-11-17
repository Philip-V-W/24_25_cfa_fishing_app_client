export enum ProductCategory {
    FISHING_RODS = 'FISHING_RODS',
    REELS = 'REELS',
    LURES = 'LURES',
    LINES = 'LINES',
    CLOTHING = 'CLOTHING',
    TACKLE_BOXES = 'TACKLE_BOXES',
    ELECTRONICS = 'ELECTRONICS',
    ACCESSORIES = 'ACCESSORIES',
    // OTHER = 'OTHER',
}

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: ProductCategory;
    imageUrl: string;
    active: boolean;
}

export interface ProductRequest {
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    category: ProductCategory;
    imageUrl?: string;
}