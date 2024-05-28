import { QueryParams } from '@/types/base';

export const renderIndexColumn =
  (queryParams: QueryParams | undefined) => (_text: any, _record: any, index: number) => {
    const page = queryParams?.page ?? 1;
    const limit = queryParams?.limit ?? 10;
    return (page - 1) * limit + index + 1;
  };
