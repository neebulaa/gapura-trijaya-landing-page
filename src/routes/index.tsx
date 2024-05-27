import AdminLayout from '@/commons/components/Layout/AdminLayout';
import DefaultLayout from '@/commons/components/Layout/DefaultLayout';
import RouteLoader from '@/commons/components/RouteLoader';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminRoutes } from './Admin';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('@/pages/Home/Home'));
const Login = lazy(() => import('@/pages/Login/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <Suspense fallback={<RouteLoader />} children={<Home />} />
          </>
        ),
      },
      {
        path: '/login',
        element: (
          <>
            {/* <PublicRoute> */}
            <Suspense fallback={<RouteLoader />} children={<Login />} />
            {/* </PublicRoute> */}
          </>
        ),
      },
      {
        path: '/dashboard',
        element: (
          <>
            <PrivateRoute>
              <Suspense fallback={<RouteLoader />} children={<Dashboard />} />
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
            <Suspense
              fallback={<RouteLoader />}
              children={<h1>Not Found</h1>}
            />
          </>
        ),
      },
    ],
  },
  {
    path: '/admin',
    // element: <AdminLayout />,
    element: (
      <PrivateRoute children={<AdminLayout/>}/>
    ),
    children: [
      // NOTE: AdminRoutes is an array of RouteObject
      ...AdminRoutes,
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
