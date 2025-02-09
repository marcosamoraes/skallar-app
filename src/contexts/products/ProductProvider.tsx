import { ReactNode, useState, useEffect, useCallback } from 'react';
import { ProductContext } from './ProductContext';
import { api } from '@services/api';
import { Product } from '@interfaces/product';
import { PaginatedResponse } from '@interfaces/pagination';
import { ProductContextType } from './types';

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<ProductContextType['pagination']>(null);

    const fetchProducts = useCallback(async (page: number = 1, search: string = '') => {
        try {
            setLoading(true);
            const response = await api.get<PaginatedResponse<Product>>('/products', {
                params: { 
                    page,
                    search 
                }
            });

            if (response.data.success) {
                setProducts(response.data.data);
                setPagination({
                    meta: response.data.meta,
                    links: response.data.links
                });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <ProductContext.Provider value={{ 
            products, 
            loading, 
            pagination,
            fetchProducts 
        }}>
            {children}
        </ProductContext.Provider>
    );
};