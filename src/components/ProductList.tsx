import { useProductContext } from "@contexts/products";
import { Product } from "@interfaces/product";
import { useMemo, useState } from "react";

const ProductList = () => {
    const { products, loading } = useProductContext();
    const [search, setSearch] = useState<string>("");

    const filteredProducts = useMemo(() => {
        return products.filter((p) => 
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);
    
    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos..."
                className="mb-4 p-2 border rounded"
            />
            
            {filteredProducts.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <ul>
                    {filteredProducts.map((product: Product) => (
                        <li key={product.id} className="mb-2">
                            <strong>{product.name}</strong> - 
                            R$ {product.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;