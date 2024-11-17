import {ProductCategory} from "@/types/product";

export interface ProductCategoryStats {
    category: string;
    totalProducts: number;
    totalSold: number;
    revenue: number;
}

export interface DashboardStatsResponse {
    totalOrders: number;
    newOrders: number;
    pendingPermits: number;
    upcomingContests: number;
    totalRevenue: number;
    averageOrderValue: number;
    totalCustomers: number;
    newCustomers: number;
    topCategories: {
        categories: ProductCategoryStats[];
    };
}

export interface SalesStatsResponse {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    dailyStats: {
        date: string;
        orders: number;
        revenue: number;
    }[];
    revenueByCategory: Record<string, number>;
    topCustomers: {
        userId: number;
        email: string;
        orderCount: number;
        totalSpent: number;
    }[];
}

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

export interface TopCustomerData {
    userId: number;
    email: string;
    orderCount: number;
    totalSpent: number;
}

export interface CategoryStats {
    category: ProductCategory;
    productCount: number;
    totalStock: number;
    activeProducts: number;
}