export interface InventoryStatsResponse {
    totalProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    stockAlerts: ProductStockAlert[];
    topSellingProducts: TopSellingProduct[];
}

export interface ProductStockAlert {
    productId: number;
    productName: string;
    currentStock: number;
    minimumStock: number;
}

export interface TopSellingProduct {
    productId: number;
    productName: string;
    totalSold: number;
    currentStock: number;
}