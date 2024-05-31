import AdminLayout from '@/commons/components/Layout/AdminLayout';
// import DefaultLayout from '@/commons/components/Layout/DefaultLayout';
import PublicLayout from '@/commons/components/Layout/PublicLayout';
import NotFound from '@/commons/components/Public/NotFound';
import RouteLoader from '@/commons/components/RouteLoader';
import RouteLoaderV2 from '@/commons/components/RouteLoaderV2';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminRoutes } from '@/routes/Admin';
import PrivateRoute from '@/routes/PrivateRoute';

const Home = lazy(() => import('@/pages/Home/Home'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));
const Shop = lazy(() => import('@/pages/Shop/Shop'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<Home />} />
          </>
        ),
      },
      {
        path: '/login',
        element: (
          <>
            {/* <PublicRoute> */}
            <Suspense fallback={<RouteLoaderV2 />} children={<Login />} />
            {/* </PublicRoute> */}
          </>
        ),
      },
      {
        path: '/register',
        element: (
          <>
            {/* <PublicRoute> */}
            <Suspense fallback={<RouteLoaderV2 />} children={<Register />} />
            {/* </PublicRoute> */}
          </>
        ),
      },
      {
        path: '/shop',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<Shop />} />
          </>
        ),
      },
      {
        path: '/contact',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<Contact />} />
          </>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <>
            <PrivateRoute>
              <Suspense fallback={<RouteLoaderV2 />} children={<Dashboard />} />
            </PrivateRoute>
          </>
        ),
      },
      // NOTE: add more routes here | Array of RouteObject
      // ...ProductRoutes,
      // ...ProductUnitRoutes,
      {
        path: '*',
        element: (
          <>
            <Suspense fallback={<RouteLoader />} children={<NotFound />} />
          </>
        ),
      },
    ],
  },

  /**
   * =====================================================================
   * Admin Routes
   * =====================================================================
   */
  {
    path: '/admin',
    element: <PrivateRoute children={<AdminLayout />} />,
    children: [
      // NOTE: AdminRoutes is an array of RouteObject
      ...AdminRoutes,
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
