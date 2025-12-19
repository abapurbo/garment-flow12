import { createBrowserRouter } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AllProducts from './pages/Products/AllProducts';
import ProductDetails from './pages/Products/ProductDetails';
import ProtectedRoute from './ProtectedRoute';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';
import Contact from './pages/Contact/Contact';
import AboutUs from './pages/AboutUs/AboutUs';
import OrderForm from './components/OrderForm';
import MyOrders from './pages/Dashboard/Buyer/MyOrders';
import MyProfile from './components/MyProfile';
import Forbidden from './components/Forbidden/Forbidden';
import BuyerPrivateRoute from './ProtectedRoutes/BuyerPrivateRoute';
import AddProduct from './pages/Dashboard/Manager/AddProduct';
import ManagerPrivateRoute from './ProtectedRoutes/ManagerPrivateRoute';
import ManageProducts from './pages/Dashboard/Manager/ManageProducts';
import PendingOrders from './pages/Dashboard/Manager/PendingOrders';
import ApprovedOrders from './pages/Dashboard/Manager/ApprovedOrders';
const MainLayout = lazy(() => import("./layouts/MainLayout"))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
const NotFound = lazy(() => import('./pages/Error/NotFound'))
import AllOrdersAdmin from './pages/Dashboard/Admin/AllOrdersAdmin';
import ManageUsers from '../src/pages/Dashboard/Admin/ManageUsers'
import AllProductsAdmin from '../src/pages/Dashboard/Admin/AllProductsAdmin'
import AdminPrivateRoute from '../src/ProtectedRoutes/AdminPrivateRoute'
import Successfull from './components/payment/Successfull';
import TrackOrder from './pages/Dashboard/Buyer/TrackOrder';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div className='bg-white dark:bg-gray-800 h-screen'><Loading /></div>}>
      <MainLayout></MainLayout>
    </Suspense>,
    errorElement:<Suspense fallback={<div className='bg-white dark:bg-gray-800 h-screen'><Loading /></div>}><NotFound></NotFound></Suspense>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signUp', element: <Register /> },
      { path: '/all-products', element: <AllProducts /> },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: '/orderForm/:id', element: <ProtectedRoute><OrderForm /></ProtectedRoute> },
      { path: '/contact', element: <Contact /> },
      { path: '/payment-success', element: <ProtectedRoute><Successfull></Successfull></ProtectedRoute> },

    ],
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<div className='bg-white dark:bg-gray-800 h-screen'>
        <Loading />
      </div>}>
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      </Suspense>
    ),
    errorElement:<Suspense fallback={<div className='bg-white dark:bg-gray-800 h-screen'><Loading /></div>}><NotFound></NotFound></Suspense>,
      children: [
        {
          path: '',
          element: <AdminPrivateRoute><Dashboard /></AdminPrivateRoute>
        },
        {
          path: 'all-orders',
          element: <AdminPrivateRoute><AllOrdersAdmin></AllOrdersAdmin></AdminPrivateRoute>
        },
        {
          path: 'manage-users',
          element: <AdminPrivateRoute><ManageUsers></ManageUsers></AdminPrivateRoute>
        }
        ,
        {
          path: 'all-products',
          element: <AdminPrivateRoute><AllProductsAdmin></AllProductsAdmin></AdminPrivateRoute>
        }
        ,
        {
          path: 'my-orders',
          element: <BuyerPrivateRoute><MyOrders /></BuyerPrivateRoute>
        },
        {
          path: 'track-order',
          element: <BuyerPrivateRoute><TrackOrder></TrackOrder></BuyerPrivateRoute>
        },
        {
          path: 'add-product',
          element: <ManagerPrivateRoute><AddProduct /></ManagerPrivateRoute>
        },
        {
          path: 'manage-products',
          element: <ManagerPrivateRoute><ManageProducts /></ManagerPrivateRoute>
        },
        {
          path: 'pending-orders',
          element: <ManagerPrivateRoute><PendingOrders /></ManagerPrivateRoute>
        },
        {
          path: 'approved-orders',
          element: <ManagerPrivateRoute><ApprovedOrders /></ManagerPrivateRoute>
        },
        {
          path: 'profile',
          element: <MyProfile />
        }
      ]
  }
  ,
  {
    path: '/forbidden',
    element: <Forbidden></Forbidden>
  },

]);
