import { axiosGetAll } from '@/services/api/admin/api.service';
import { QueryParams } from '@/types/base';
import { IProduct } from '@/types/product';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = (params: QueryParams) => {
  return useQuery({
    queryKey: ['products', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IProduct>(`/v1/products`, params);
    },
  });
};
