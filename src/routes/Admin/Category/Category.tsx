import RouteLoader from '@/commons/components/RouteLoader';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const CategoryIndex = lazy(
  () => import('@/pages/Admin/Category/CategoryIndex/CategoryIndex')
);

export const CategoryRoutes: RouteObject[] = [
  {
    path: 'categories',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CategoryIndex />
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
      {
        path: 'create',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <h1>Category Create</h1>
          </Suspense>
        ),
      },
      {
        path: ':id/edit',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <h1>Category Edit</h1>
          </Suspense>
        ),
      },
    ],
  },
];
