import RouteLoader from '@/commons/components/RouteLoader';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const OrderIndex = lazy(() => import('@/pages/Admin/Order/OrderIndex/OrderIndex'));
const OrderDetail = lazy(() => import('@/pages/Admin/Order/OrderDetail/OrderDetail'));
const OrderCancel = lazy(() => import('@/pages/Admin/Order/OrderCancel/OrderCancel'));

export const OrderRoutes: RouteObject[] = [
  {
    path: 'orders',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <OrderIndex />
          </Suspense>
        ),
      },
      // {
      //   path: "deleted",
      //   element: (
      //     <Suspense fallback={<></>}>
      //         <h1>Category Delete</h1>
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: 'create',
      //   element: (
      //     <Suspense fallback={<RouteLoader />}>
      //       <ProductTabMenu formType={FormType.CREATE} />
      //     </Suspense>
      //   ),
      // },
      {
        path: ':id/show',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <OrderDetail />
          </Suspense>
        ),
      },
      {
        path: ':id/cancel',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <OrderCancel />
          </Suspense>
        ),
      },
    ],
  },
];
