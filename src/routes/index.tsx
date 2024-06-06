import AdminLayout from '@/commons/components/Layout/AdminLayout';
// import DefaultLayout from '@/commons/components/Layout/DefaultLayout';
import PublicLayout from '@/commons/components/Layout/PublicLayout';
import NotFound from '@/commons/components/Public/NotFound';
import RouteLoader from '@/commons/components/RouteLoader';
import RouteLoaderV2 from '@/commons/components/RouteLoaderV2';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { AdminRoutes } from '@/routes/Admin';
import PrivateRoute from '@/routes/PrivateRoute';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home/Home'));
const Login = lazy(() => import('@/pages/Auth/Login'));
const Register = lazy(() => import('@/pages/Auth/Register'));
const Shop = lazy(() => import('@/pages/Shop/Shop'));
const ShopDetail = lazy(() => import('@/pages/Shop/ShopDetail/ShopDetail'));
const ShoppingCart = lazy(() => import('@/pages/ShoppingCart/ShoppingCart'));
const Checkout = lazy(() => import('@/pages/Checkout/Checkout'));
const Profile = lazy(() => import('@/pages/Profile/Profile'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const CheckoutBillingInformation = lazy(
  () => import('@/pages/Checkout/components/CheckoutBillingInformation')
);
const CheckoutDelivery = lazy(() => import('@/pages/Checkout/components/CheckoutDelivery'));
const CheckoutPayment = lazy(() => import('@/pages/Checkout/components/CheckoutPayment'));
const CheckoutSuccess = lazy(() => import('@/pages/Checkout/components/CheckoutSuccess'));
const MyPoin = lazy(() => import('@/pages/MyPoin/MyPoin'));
const ProfilePersonalInformation = lazy(
  () => import('@/pages/Profile/components/ProfilePersonalInformation')
);
const ProfileOrders = lazy(() => import('@/pages/Profile/components/ProfileOrders'));
const ProfileManageAddresse = lazy(
  () => import('@/pages/Profile/components/ProfileManageAddresse')
);
const ProfileSetting = lazy(() => import('@/pages/Profile/components/ProfileSetting'));

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
        path: '/shop/:slug',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<ShopDetail />} />
          </>
        ),
      },
      {
        path: '/cart',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<ShoppingCart />} />
          </>
        ),
      },
      {
        path: '/checkout',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<Checkout />} />
          </>
        ),
        children: [
          {
            path: 'billing-information',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<CheckoutBillingInformation />} />
              </>
            ),
          },
          {
            path: 'delivery',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<CheckoutDelivery />} />
              </>
            ),
          },
          {
            path: 'payment',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<CheckoutPayment />} />
              </>
            ),
          },
          {
            path: 'success',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<CheckoutSuccess />} />
              </>
            ),
          },
        ],
      },
      {
        path: '/profile',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<Profile />} />
          </>
        ),
        children: [
          {
            // path: 'personal-information',
            index: true,
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<ProfilePersonalInformation />} />
              </>
            ),
          },
          {
            path: 'personal-information',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<ProfilePersonalInformation />} />
              </>
            ),
          },
          {
            path: 'orders',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<ProfileOrders />} />
              </>
            ),
          },
          {
            path: 'manage-addresses',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<ProfileManageAddresse />} />
              </>
            ),
          },
          {
            path: 'settings',
            element: (
              <>
                <Suspense fallback={<RouteLoaderV2 />} children={<ProfileSetting />} />
              </>
            ),
          },
        ],
      },
      {
        path: '/my-poin',
        element: (
          <>
            <Suspense fallback={<RouteLoaderV2 />} children={<MyPoin />} />
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
