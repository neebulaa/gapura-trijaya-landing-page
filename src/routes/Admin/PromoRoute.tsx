import { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import RouteLoader from '@/commons/components/RouteLoader.tsx';
import { FormType } from '@/types/global/form.ts';

const PromoIndex = lazy(() => import('@/pages/Admin/Promo/PromoIndex/PromoIndex'));
const PromoForm = lazy(() => import('@/pages/Admin/Promo/PromoForm/PromoForm'));

export const PromoRoutes: RouteObject[] = [
  {
    path: 'promos',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PromoIndex />
          </Suspense>
        ),
      },
      {
        path: 'create',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PromoForm formType={FormType.CREATE} />
          </Suspense>
        ),
      },
      {
        path: ':id/edit',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PromoForm formType={FormType.UPDATE} />
          </Suspense>
        ),
      },
    ],
  },
];
