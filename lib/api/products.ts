import {fetchApi} from './config';
import {ProductCategory, ProductResponse} from '@/types/product';

export const productApi = {
    getAll: async () => {
        return await fetchApi<ProductResponse[]>('/api/products');
    },

    getById: async (id: number) => {
        return await fetchApi<ProductResponse>(`/api/products/${id}`);
    },

    create: async (product: Omit<ProductResponse, 'id'>) => {
        return await fetchApi<ProductResponse>('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {'Content-Type': 'application/json'}
        });
    },

    updateStock: async (id: number, quantity: number) => {
        return await fetchApi<ProductResponse>(
            `/api/products/${id}/stock?quantity=${quantity}`,
            {method: 'PATCH'}
        );
    },

    delete: async (id: number) => {
        return await fetchApi<void>(`/api/products/${id}`, {
            method: 'DELETE'
        });
    },

    getAllForAdmin: async () => {
        return await fetchApi<ProductResponse[]>('/api/products', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    },

    toggleStatus: async (productId: number) => {
        return await fetchApi<ProductResponse>(
            `/api/admin/products/${productId}/toggle-status`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
    },

    search: async (term: string) => {
        return await fetchApi<ProductResponse[]>(`/api/products/search?keyword=${term}`);
    },

    getByCategory: async (category: ProductCategory) => {
        return await fetchApi<ProductResponse[]>(`/api/products/category/${category}`);
    }
};