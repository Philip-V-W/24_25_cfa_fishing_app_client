import {fetchApi} from './config';
import {CategoryStats} from '@/types/admin';
import {ProductCategory} from '@/types/product';

export const categoryApi = {
    getAllWithStats: async (): Promise<CategoryStats[]> => {
        return await Promise.all(
            Object.values(ProductCategory).map(async (category) => {
                const products: {
                    stockQuantity?: number;
                    active: boolean
                }[] = (await fetchApi(`/api/products/category/${category}`)) || [];
                return {
                    category,
                    productCount: products.length,
                    totalStock: products.reduce((sum: number, p: any) => sum + (p.stockQuantity || 0), 0),
                    activeProducts: products.filter((p: any) => p.active).length
                };
            })
        );
    },

    // create: async (categoryName: string): Promise<void> => {
    //     const normalizedName = categoryName.toUpperCase().replace(/\s+/g, '_');
    //      await fetchApi('/api/admin/categories', {
    //         method: 'POST',
    //         body: JSON.stringify({name: normalizedName}),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // },
    //
    // delete: async (categoryId: string): Promise<void> => {
    //      await fetchApi(`/api/admin/categories/${categoryId}`, {
    //         method: 'DELETE'
    //     });
    // },
    //
    // update: async (categoryId: string, data: { name?: string }): Promise<void> => {
    //      await fetchApi(`/api/admin/categories/${categoryId}`, {
    //         method: 'PUT',
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // },
    //
    // getStats: async (categoryId: string): Promise<{
    //     totalProducts: number;
    //     activeProducts: number;
    //     totalStock: number;
    // }> => {
    //     return await fetchApi(`/api/admin/categories/${categoryId}/stats`);
    // }
};