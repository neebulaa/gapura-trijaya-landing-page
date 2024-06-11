import RouteLoader from '@/commons/components/RouteLoader';
import { AttributeRoutes } from '@/routes/Admin/AttributeRoute';
import { CategoryRoutes } from '@/routes/Admin/CategoryRoute';
import { ProductRoutes } from '@/routes/Admin/ProductRoute';
import { UserRoutes } from '@/routes/Admin/UserRoute';
import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { OrderRoutes } from './OrderRoute';

const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard/DashboardIndex'));
const Profile = lazy(() => import('@/pages/Admin/Profile/ProfileIndex'));
const Setting = lazy(() => import('@/pages/Admin/Setting/SettingIndex'));

export const AdminRoutes: RouteObject[] = [
  {
    path: '*',
    children: [
      {
        index: true,
        element: (
          <>
            <Suspense fallback={<RouteLoader />} children={<AdminDashboard />} />
          </>
        ),
      },
      // NOTE: add more routes here | Array of RouteObject
      ...CategoryRoutes,
      ...ProductRoutes,
      ...AttributeRoutes,
      ...UserRoutes,
      ...OrderRoutes,
      {
        path: 'profile',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: 'setting',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Setting />
          </Suspense>
        ),
      },
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
