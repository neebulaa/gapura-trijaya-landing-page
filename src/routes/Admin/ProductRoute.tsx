import RouteLoader from '@/commons/components/RouteLoader';
import { FormType } from '@/types/global/form.ts';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const ProductIndex = lazy(() => import('@/pages/Admin/Product/ProductIndex/ProductIndex'));
const ProductTabMenu = lazy(() => import('@/pages/Admin/Product/ProductForm/ProductForm'));

export const ProductRoutes: RouteObject[] = [
  {
    path: 'products',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ProductIndex />
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
            <ProductTabMenu formType={FormType.CREATE} />
          </Suspense>
        ),
      },
      {
        path: ':id/edit',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ProductTabMenu formType={FormType.UPDATE} />
          </Suspense>
        ),
      },
    ],
  },
];
