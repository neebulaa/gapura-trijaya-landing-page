import { getCategories } from '@/services/api/admin/category.service';
import { QueryParams } from '@/types/base';
import { useQuery } from '@tanstack/react-query';

export const useCategoryQuery = (params: QueryParams) =>
  useQuery({
    queryKey: ['categories', { params }],
    queryFn: async () => {
      const res = await getCategories(params);
      return res;
    },
  });
