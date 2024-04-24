import React from 'react';

import CategoryList from '../CategoryList/display';
import AddCategoryForm from '../CategoryList/add';
import EditCategoryForm from '../CategoryList/edit';
import MainBuyer from '../Home/mainuser';
import ProductList from '../ProductList/list';
import AddProductForm from '../ProductList/add';
import EditProductForm from '../ProductList/edit';
import EditStockForm from '../Stock/edit';
import ProductDetails from '../ProductList/show';
import Stock from '../Stock/Stock';
import Orders from '../Sales/orders';
import SignUpForm from '../Buyers/register';
import SignInForm from '../Buyers/login';
import Main from '../Home/main';
import AddOrder from '../Sales/add';
import SupplierList from '../Supplier/display';
import AddSupplierForm from '../Supplier/add';
import ProfilePage from '../Profile/profile';
import AddAdminForm from '../Admin/add';
import AdminList from '../Admin/admin';
import SignInFormAdmin from '../Admin/login';
const Routess = [
  { path: '/product', element: <ProductList /> },
  { path: '/admin', element: <AdminList /> },
  { path: '/adminlogin', element: <SignInFormAdmin /> },
  { path: '/supplier', element: <SupplierList /> },
  { path: '/addorder', element: <AddOrder /> },
  { path: '/home', element: <Main /> },
  { path: '/', element: <MainBuyer /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/stock', element: <Stock /> },
  { path: '/login', element: <SignInForm /> },
  { path: '/register', element: <SignUpForm /> },
  { path: '/order', element: <Orders /> },
  { path: '/category', element: <CategoryList /> },
  { path: '/add', element: <AddCategoryForm /> },
  { path: '/add/product', element: <AddProductForm /> },
  { path: '/add/admin', element: <AddAdminForm /> },
  { path: '/add/supplier', element: <AddSupplierForm /> },
  { path: '/category/edit/:id', element: <EditCategoryForm /> },
  { path: '/product/edit/:id', element: <EditProductForm /> },
  { path: '/stock/edit/:id', element: <EditStockForm /> },
  { path: '/product/show/:id', element: <ProductDetails /> },
];

export default Routess;

