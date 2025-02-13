import { useDebounce } from "@/hooks/useDebounce";
import { useProductContext } from "@contexts/products";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const ProductList = () => {
    const { products, loading, pagination, fetchProducts } = useProductContext();
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500); // 500ms delay

    const searchInputRef = useRef<HTMLInputElement>(null);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const page = Number(searchParams.get('page')) || 1;
        fetchProducts(page, debouncedSearch).finally(() => {
            searchInputRef.current?.focus();
        });
    }, [debouncedSearch, searchParams, fetchProducts]);

    useEffect(() => {
        if (debouncedSearch !== searchParams.get('search')) {
            setSearchParams({ 
                page: '1',
                ...(debouncedSearch && { search: debouncedSearch })
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    const handlePageChange = (page: number) => {
        setSearchParams({ 
            page: page.toString(),
            ...(search && { search })
        });
    };
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <p className="text-gray-500">Carregando...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar produtos..."
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            {products.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum produto encontrado.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                            Preço
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                            Estoque
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {product.name}
                                                </div>
                                                {product.description && (
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">
                                                        {product.description}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                                <div className="text-sm text-gray-900">
                                                    R$ {String(product.price).replace(".", ",")}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                                <div className="text-sm text-gray-900">
                                                    {product.stock}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium sm:px-6">
                                                <Link
                                                    to={`/products/${product.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {pagination && (
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={() => handlePageChange(pagination.meta.current_page - 1)}
                            disabled={!pagination.links.prev}
                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => handlePageChange(pagination.meta.current_page + 1)}
                            disabled={pagination.meta.current_page === pagination.meta.last_page}
                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                            Próximo
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">{pagination.meta.from}</span> até{" "}
                                <span className="font-medium">{pagination.meta.to}</span> de{" "}
                                <span className="font-medium">{pagination.meta.total}</span> resultados
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(pagination.meta.current_page - 1)}
                                    disabled={!pagination.links.prev}
                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                >
                                    <span className="sr-only">Anterior</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handlePageChange(pagination.meta.current_page + 1)}
                                    disabled={pagination.meta.current_page === pagination.meta.last_page}
                                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                >
                                    <span className="sr-only">Próximo</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;