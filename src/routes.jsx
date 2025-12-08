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
