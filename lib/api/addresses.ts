import { fetchApi } from './config';
import type { AddressRequest, AddressResponse } from '@/types/account';

export const addressApi = {
    getAll: async () => {
        return await fetchApi<AddressResponse[]>('/api/account/addresses');
    },

    create: async (address: AddressRequest) => {
        return await fetchApi<AddressResponse>('/api/account/addresses', {
            method: 'POST',
            body: JSON.stringify(address),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    update: async (id: number, address: AddressRequest) => {
        return await fetchApi<AddressResponse>(`/api/account/addresses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(address),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    delete: async (id: number) => {
        return await fetchApi(`/api/account/addresses/${id}`, {
            method: 'DELETE'
        });
    },

    setDefault: async (id: number) => {
        return await fetchApi<AddressResponse>(`/api/account/addresses/${id}/default`, {
            method: 'PATCH'
        });
    },
};