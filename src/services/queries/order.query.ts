import { axiosGet, axiosGetAll, axiosPost } from '@/services/api/admin/api.service';
import { SuccessResponse } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions';
import { IOrder } from '@/types/order';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (newOrder: any) => {
      return await axiosPost<any, any>('/v1/order/checkout', newOrder);
    },
  });
};

export const useGetReceivedOrder = (id: string) => {
  return useQuery<SuccessResponse<IOrder>>({
    queryKey: ['received', id],
    queryFn: async () => {
      return await axiosGet(`/v1/order/received/${id}`);
    },
  });
};

export const useGetProvinces = ({ enabled }: QueryOptions) => {
  return useQuery<SuccessResponse<any>>({
    queryKey: ['provinces'],
    queryFn: async () => {
      return await axiosGet(`/v1/order/provinces`);
    },
    enabled: !!enabled,
  });
};

export const useGetCities = (params: any, { enabled }: QueryOptions) => {
  return useQuery({
    queryKey: ['cities', params],
    queryFn: async () => {
      return await axiosGetAll<any, any>(`/v1/order/cities`, params);
    },
    enabled: !!enabled,
  });
};
