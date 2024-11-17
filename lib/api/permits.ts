import {fetchApi} from './config';
import type {PermitResponse, PermitRequest} from '@/types/permit';

export const permitApi = {
    // User endpoints
    create: async (permit: PermitRequest) => {
        return await fetchApi<PermitResponse>('/api/permits', {
            method: 'POST',
            body: JSON.stringify(permit),
            headers: {'Content-Type': 'application/json'}
        });
    },

    getPermitById: async (permitId: number) => {
        return await fetchApi<PermitResponse>(`/api/permits/${permitId}`);
    },

    getUserPermits: async () => {
        return await fetchApi<PermitResponse[]>('/api/permits/user');
    },

    // Admin endpoints
    getAllPermits: async () => {
        return await fetchApi<PermitResponse[]>('/api/permits/all');
    },

    getPermitsByUserId: async (userId: number) => {
        return await fetchApi<PermitResponse[]>(`/api/permits/user/${userId}`);
    },

    approvePermit: async (permitId: number) => {
        return await fetchApi<PermitResponse>(`/api/permits/${permitId}/approve`, {
            method: 'PATCH'
        });
    },

    rejectPermit: async (permitId: number, reason: string) => {
        return await fetchApi<PermitResponse>(
            `/api/permits/${permitId}/reject?reason=${encodeURIComponent(reason)}`,
            {method: 'PATCH'}
        );
    }
};