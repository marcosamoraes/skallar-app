import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from '@contexts/products';
import Home from '@pages/Home';
import ProductEdit from '@pages/ProductEdit';
import DefaultLayout from '@layouts/DefaultLayout';

const App = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/new" element={<ProductEdit />} />
            <Route path="/products/:id" element={<ProductEdit />} />
          </Routes>
        </DefaultLayout>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default App;