import RouteLoader from '@/commons/components/RouteLoader';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { FormType } from '@/types/global/form.ts';

const CategoryIndex = lazy(
  () => import('@/pages/Admin/Category/CategoryIndex/CategoryIndex')
);
const CategoryForm = lazy(() => import('@/pages/Admin/Category/CategoryForm/CategoryForm'));

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
        )
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
            <CategoryForm formType={FormType.CREATE} />
          </Suspense>
        )
      },
      {
        path: ':id/edit',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CategoryForm formType={FormType.UPDATE} />
          </Suspense>
        )
      }
    ]
  }
];
