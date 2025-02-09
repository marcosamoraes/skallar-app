import { Product } from '@interfaces/product';
import { PaginatedResponse } from '@interfaces/pagination';

export interface ProductContextType {
    products: Product[];
    loading: boolean;
    pagination: {
        meta: PaginatedResponse<Product>['meta'];
        links: PaginatedResponse<Product>['links'];
    } | null;
    fetchProducts: (page?: number, search?: string) => Promise<void>;
}