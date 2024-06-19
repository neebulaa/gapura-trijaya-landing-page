import { axiosGet, axiosGetAll } from '@/services/api/admin/api.service';
import { QueryParams, SuccessResponse } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions.ts';
import { IOrder } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

export const useGetOrders = (params: QueryParams) => {
  return useQuery({
    queryKey: ['orders', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IOrder>(`/v1/admin/orders`, params);
    },
  });
};

export const useGetOrder = (id: string, { enabled }: QueryOptions) => {
  return useQuery<SuccessResponse<IOrder>>({
    queryKey: ['order', id],
    queryFn: async () => {
      return await axiosGet(`/v1/admin/orders/${id}`);
    },
    enabled: !!enabled,
  });
};

