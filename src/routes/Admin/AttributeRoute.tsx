import RouteLoader from '@/commons/components/RouteLoader';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { FormType } from '@/types/global/form.ts';

const AttributeIndex = lazy(
  () => import('@/pages/Admin/Attribute/AttributeIndex/AttributeIndex')
);
const AttributeForm = lazy(() => import('@/pages/Admin/Attribute/AttributeForm/AttributeForm'));

export const AttributeRoutes: RouteObject[] = [
  {
    path: 'attributes',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AttributeIndex />
          </Suspense>
        )
      },
      // {
      //   path: "deleted",
      //   element: (
      //     <Suspense fallback={<></>}>
      //         <h1>Attribute Delete</h1>
      //     </Suspense>
      //   ),
      // },
      {
        path: 'create',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AttributeForm formType={FormType.CREATE} />
          </Suspense>
        )
      },
      {
        path: ':id/edit',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AttributeForm formType={FormType.UPDATE} />
          </Suspense>
        )
      }
    ]
  }
];
