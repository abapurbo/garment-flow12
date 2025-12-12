import { createBrowserRouter } from 'react-router';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AllProducts from './pages/Products/AllProducts';
import ProductDetails from './pages/Products/ProductDetails';
import BookingForm from './pages/Booking/BookingForm';
import NotFound from './pages/Error/NotFound';
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
const MainLayout = lazy(() => import("./layouts/MainLayout"))
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<Loading />}>
      <MainLayout></MainLayout>
    </Suspense>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signUp', element: <Register /> },
      { path: '/all-products', element: <AllProducts /> },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/details', element: <ProductDetails /> },
      { path: '/orderForm', element: <OrderForm /> },
      { path: '/contact', element: <Contact /> },
      { path: '/booking/:id', element: <BookingForm /> },
    ],
  },
  {
    path: '/dashboard',
    element: <Suspense fallback={<Loading />}>
      <ProtectedRoute><DashboardLayout /></ProtectedRoute>
    </Suspense>,
    children: [
      // buyer only routes
      {
        path: '/dashboard/my-orders',
        element: <BuyerPrivateRoute>
          <MyOrders></MyOrders>
        </BuyerPrivateRoute>

      },
      {
        path: '/dashboard/add-product',
        element: <ManagerPrivateRoute>
          <AddProduct></AddProduct>
        </ManagerPrivateRoute>
      },
      {
        path: '/dashboard/profile',
        element: <MyProfile></MyProfile>
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path:'/forbidden',
    element:<Forbidden></Forbidden>
  }

]);
