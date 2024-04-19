import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategoryList from './Pages/CategoryList/display';
import AddCategoryForm  from './Pages/CategoryList/add';
import EditCategoryForm from './Pages/CategoryList/edit';
import Navbar from './Pages/Home/Navbar/navbar';
import Sidebar from './Pages/Home/Navbar/sidebar';
import ProductList from './Pages/ProductList/list';
import AddProductForm from './Pages/ProductList/add';
import EditProductForm from './Pages/ProductList/edit';
import EditStockForm from './Pages/Stock/edit';
import ProductDetails from './Pages/ProductList/show';
import Stock from './Pages/Stock/Stock';
import Orders from './Pages/Sales/orders';
function App() {
  return (

      <div>
                             <Navbar />
      <Sidebar />
        <Routes>
        <Route path="/" element={<ProductList />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/add" element={<AddCategoryForm  />} />
          <Route path="/add/product" element={<AddProductForm  />} />
          <Route path="/category/edit/:id" element={<EditCategoryForm  />} />
          <Route path="/product/edit/:id" element={<EditProductForm  />} />
          <Route path="/stock/edit/:id" element={<EditStockForm   />} />
          <Route path="/product/show/:id" element={<ProductDetails  />} />
        </Routes>
      </div>
   
  );
}

export default App;

