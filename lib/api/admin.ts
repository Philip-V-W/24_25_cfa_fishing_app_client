import {fetchApi} from './config';
import {
    DashboardStatsResponse,
    InventoryStatsResponse,
    SalesStatsResponse
} from '@/types/admin';

export const adminApi = {
    getDashboardStats: async (startDate: string, endDate: string) => {
        return await fetchApi<DashboardStatsResponse>(
            `/api/admin/dashboard/stats?startDate=${startDate}&endDate=${endDate}`
        );
    },

    getInventoryStats: async () => {
        return await fetchApi<InventoryStatsResponse>('/api/admin/dashboard/inventory');
    },

    getSalesStats: async (startDate: string, endDate: string) => {
        return await fetchApi<SalesStatsResponse>(
            `/api/admin/dashboard/sales?startDate=${startDate}&endDate=${endDate}`
        );
    }
};