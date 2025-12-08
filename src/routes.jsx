import { createBrowserRouter } from 'react-router';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AllProducts from './pages/Products/AllProducts';
import ProductDetails from './pages/Products/ProductDetails';
import BookingForm from './pages/Booking/BookingForm';
import NotFound from './pages/Error/NotFound';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/products', element: <AllProducts /> },
      { path: '/products/:id', element: <ProductDetails /> },
      { path: '/booking/:id', element: <BookingForm /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      // Dashboard routes will be added here
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
