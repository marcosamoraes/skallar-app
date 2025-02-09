import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from '@contexts/products';
import Home from '@pages/Home';
import ProductEdit from '@pages/ProductEdit';

const App = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/new" element={<ProductEdit />} />
          <Route path="/products/:id" element={<ProductEdit />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;