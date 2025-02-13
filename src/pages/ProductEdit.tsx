import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@services/api';
import ProductForm from '@components/ProductForm';
import { Product } from '@interfaces/product';
import { AxiosError } from 'axios';
import { IoArrowBack } from 'react-icons/io5';

interface ApiResponse {
  success: boolean;
  data: Product;
  message?: string;
}

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id && id !== 'new') {
      loadProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProduct = async (): Promise<void> => {
    try {
      const response = await api.get<ApiResponse>(`/products/${id}`);
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setError(
        axiosError.response?.data?.message || 
        'Erro ao carregar produto'
      );
    }
  };

  const handleSubmit = async (data: Partial<Product>): Promise<void> => {
    try {
      setIsLoading(true);
      setError('');

      if (id === 'new') {
        await api.post<ApiResponse>('/products', data);
      } else {
        await api.put<ApiResponse>(`/products/${id}`, data);
      }
      
      navigate('/', { replace: true });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      setError(
        axiosError.response?.data?.message || 
        'Erro ao salvar produto'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded" role="alert">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {id === 'new' ? 'Novo Produto' : 'Editar Produto'}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <IoArrowBack className="h-5 w-5" />
          Voltar
        </button>
      </div>
      
      <ProductForm
        initialData={product || undefined}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductEdit;