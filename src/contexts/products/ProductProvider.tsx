import { ReactNode, useState, useEffect } from 'react';
import { ProductContext } from './ProductContext';
import { api } from '@services/api';
import { Product } from '@interfaces/product';

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/products").then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading }}>
            {children}
        </ProductContext.Provider>
    );
};