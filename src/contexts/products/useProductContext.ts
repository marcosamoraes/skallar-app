import { useContext } from 'react';
import { ProductContext } from './ProductContext';
import { ProductContextType } from './types';

export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};