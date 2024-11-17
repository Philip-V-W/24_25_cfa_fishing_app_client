import {ProductCategory} from "@/types/product";

// export interface ProductCategoryStatsResponse {
//     categories: CategoryStats[];
// }

export interface CategoryStats {
    category: ProductCategory;
    productCount: number;
    totalStock: number;
    activeProducts: number;
}