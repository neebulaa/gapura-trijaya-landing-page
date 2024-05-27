import RouteLoader from '@/commons/components/RouteLoader';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { CategoryRoutes } from './Category/Category';

const AdminDashboard = lazy(
  () => import('@/pages/Admin/Dashboard/DashboardIndex')
);

export const AdminRoutes: RouteObject[] = [
  {
    path: '*',
    children: [
      {
        index: true,
        element: (
          <>
            <Suspense
              fallback={<RouteLoader />}
              children={<AdminDashboard />}
            />
          </>
        ),
      },
      // NOTE: add more routes here | Array of RouteObject
      ...CategoryRoutes,
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <h1>Not Found</h1>
          </Suspense>
        ),
      },
    ],
  },
];
