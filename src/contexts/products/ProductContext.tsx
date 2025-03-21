import { createContext } from 'react';
import { ProductContextType } from './types';

export const ProductContext = createContext<ProductContextType | null>(null);