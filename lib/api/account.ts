import {fetchApi} from './config';
import type {
    UserProfile,
    Address,
    OrderSummary,
    PermitSummary,
    ContestRegistration,
    AddressRequest,
    AddressResponse
} from '@/types/account';
import {OrderResponse} from "@/types/order";
import {PermitResponse} from "@/types/permit";

export const accountApi = {
    getProfile: async () => {
        return await fetchApi<UserProfile>('/api/account/profile');
    },

    updateProfile: async (data: Partial<UserProfile>) => {
        return await fetchApi<UserProfile>('/api/account/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
    },

    // Addresses
    getAddresses: async () => {
        return await fetchApi<Address[]>('/api/account/addresses');
    },

    addAddress: async (address: AddressRequest) => {
        return await fetchApi<Address>('/api/account/addresses', {
            method: 'POST',
            body: JSON.stringify(address),
            headers: {'Content-Type': 'application/json'}
        });
    },

    updateAddress: async (id: number, address: AddressRequest) => {
        return await fetchApi<AddressResponse>(`/api/account/addresses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(address),
            headers: {'Content-Type': 'application/json'}
        });
    },

    deleteAddress: async (id: number) => {
        return await fetchApi<void>(`/api/account/addresses/${id}`, {
            method: 'DELETE'
        });
    },

    setDefaultAddress: async (id: number) => {
        return await fetchApi<void>(`/api/account/addresses/${id}/default`, {
            method: 'PATCH'
        });
    },

    // Orders
    getOrders: async () => {
        return await fetchApi<OrderSummary[]>('/api/account/orders');
    },

    getOrderDetails: async (id: number) => {
        return await fetchApi<OrderResponse>(`/api/account/orders/${id}`);
    },

    // Permits
    getPermits: async () => {
        return await fetchApi<PermitSummary[]>('/api/account/permits');
    },

    getPermitDetails: async (id: number) => {
        return await fetchApi<PermitResponse>(`/api/account/permits/${id}`);
    },

    // Contests
    getContestRegistrations: async () => {
        return await fetchApi<ContestRegistration[]>('/api/account/contests');
    },

    getContestRegistrationDetails: async (id: number) => {
        return await fetchApi<ContestRegistration>(`/api/account/contests/${id}`);
    }
};