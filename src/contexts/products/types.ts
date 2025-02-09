import { Product } from '@interfaces/product';

export interface ProductContextType {
  products: Product[];
  loading: boolean;
}