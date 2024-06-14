import RouteLoader from '@/commons/components/RouteLoader';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const ShipmentIndex = lazy(() => import('@/pages/Admin/Shipment/ShipmentIndex/ShipmentIndex'));

export const ShipmentRoutes: RouteObject[] = [
  {
    path: 'shipments',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ShipmentIndex />
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
      // {
      //   path: ':id/show',
      //   element: (
      //     <Suspense fallback={<RouteLoader />}>
      //       <OrderDetail />
      //     </Suspense>
      //   ),
      // },
    ],
  },
];
