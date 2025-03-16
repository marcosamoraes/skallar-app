import { FormEvent, useEffect, useState } from 'react';
import { Product } from '@interfaces/product';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  isLoading?: boolean;
}

const ProductForm = ({ initialData, onSubmit, isLoading }: ProductFormProps) => {
  const [formData, setFormData] = useState<Product>({
    id: -1,
    name: '',
    price: 0,
    stock: 0,
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Nome do Produto
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Preço
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium">
            Estoque
          </label>
          <input
            type="number"
            id="stock"
            value={formData.stock}
            onChange={e => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
            required
            min="0"
            className="mt-1 block w-full rounded-md border p-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Descrição
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border p-2"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
};

export default ProductForm;