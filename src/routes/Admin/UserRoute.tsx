import RouteLoader from '@/commons/components/RouteLoader';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const UserIndex = lazy(() => import('@/pages/Admin/User/UserIndex/UserIndex'));

export const UserRoutes: RouteObject[] = [
  {
    path: 'users',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <UserIndex />
          </Suspense>
        ),
      },
      //   {
      //     path: 'create',
      //     element: (
      //       <Suspense fallback={<RouteLoader />}>
      //         <UserTabMenu formType={FormType.CREATE} />
      //       </Suspense>
      //     ),
      //   },
      //   {
      //     path: ':id/edit',
      //     element: (
      //       <Suspense fallback={<RouteLoader />}>
      //         <UserTabMenu formType={FormType.UPDATE} />
      //       </Suspense>
      //     ),
      //   },
    ],
  },
];
