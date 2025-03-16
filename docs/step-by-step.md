## **1. Configuração do Ambiente**
### **1.1 Instalar Dependências**
- PHP 8+  
- Composer  
- MySQL  
- Node.js + npm/yarn  
- Redis ou Memcached  
- Git  

### **1.2 Criar o Projeto Laravel (ou CodeIgniter)**
```sh
composer create-project laravel/laravel product-management
cd product-management
```
*(Se for CodeIgniter, baixe e configure manualmente)*  

### **1.3 Configurar Banco de Dados**
- Criar um banco `product_db` no MySQL  
- Configurar `.env`  
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=product_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## **2. Backend - Laravel API**
### **2.1 Criar Model e Migration**
```sh
php artisan make:model Product -m
```
**Editar a migration:**  
```php
Schema::create('products', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->decimal('price', 10, 2);
    $table->integer('stock');
    $table->timestamps();
});
```
```sh
php artisan migrate
```

### **2.2 Criar Factory e Seeder (Opcional)**
```sh
php artisan make:factory ProductFactory --model=Product
```
Adicionar no `ProductFactory.php`:  
```php
public function definition() {
    return [
        'name' => $this->faker->word,
        'description' => $this->faker->sentence,
        'price' => $this->faker->randomFloat(2, 10, 1000),
        'stock' => $this->faker->numberBetween(1, 100),
    ];
}
```
```sh
php artisan db:seed --class=ProductSeeder
```

### **2.3 Criar Controller e Rotas**
```sh
php artisan make:controller ProductController --api
```
Definir as rotas no `routes/api.php`:  
```php
Route::apiResource('products', ProductController::class);
```

### **2.4 Implementar Cache**
Instalar Redis:  
```sh
composer require predis/predis
```
Configurar `.env`:  
```env
CACHE_DRIVER=redis
```
Adicionar cache na listagem:  
```php
$products = Cache::remember('products', 60, function () {
    return Product::all();
});
```

---

## **3. Frontend - React**
### **3.1 Criar Projeto React**
```sh
npm create vite@latest frontend --template react-ts
cd frontend
npm install axios react-router-dom
```

### **3.2 Criar Estrutura de Pastas**
```
frontend/
│── src/
│   ├── components/
│   │   ├── ProductList.tsx
│   │   ├── ProductForm.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductEdit.tsx
│   ├── context/
│   │   ├── ProductContext.tsx
│   ├── App.tsx
│   ├── index.tsx
```

### **3.3 Criar API Service (`api.ts`)**
```ts
import axios from "axios";
export const api = axios.create({ baseURL: "http://localhost:8000/api" });
```

### **3.4 Criar Context API (`ProductContext.tsx`)**
```ts
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const ProductContext = createContext<any>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState([]);
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

export const useProductContext = () => useContext(ProductContext);
```

### **3.5 Criar Listagem (`ProductList.tsx`)**
```tsx
import { useProductContext } from "../context/ProductContext";

const ProductList = () => {
    const { products, loading } = useProductContext();
    
    return loading ? <p>Carregando...</p> : (
        <ul>{products.map((p: any) => <li key={p.id}>{p.name} - R$ {p.price}</li>)}</ul>
    );
};

export default ProductList;
```

---

## **4. Banco de Dados - Otimizações**
### **4.1 Índice para Busca**
```sql
CREATE INDEX idx_products_name ON products(name);
```

---

## **5. Otimizações e Melhorias**
### **5.1 Cache na API**
```php
$products = Cache::remember('products', 60, function () {
    return Product::paginate(10);
});
```

### **5.2 Evitar Re-renders no React**
Usar `useMemo` no `ProductList.tsx`:  
```tsx
const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.includes(search));
}, [products, search]);
```

---

## **6. Documentação**
Criar um `README.md` com:  
- Instruções de instalação  
- Passos para rodar backend e frontend  
- Dependências utilizadas  
- Explicação sobre otimizações e cache  

---

Esse passo-a-passo garante que seu teste esteja bem estruturado, funcional e otimizado!
