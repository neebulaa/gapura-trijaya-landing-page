import { axiosGet, axiosGetAll, axiosPut } from '@/services/api/admin/api.service';
import { QueryParams, SuccessResponse } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions.ts';
import { IShipment } from '@/types/shipment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetShipments = (params: QueryParams) => {
  return useQuery({
    queryKey: ['shipments', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IShipment>(`/v1/admin/shipments`, params);
    },
  });
};

export const useGetShipment = (id: string, { enabled }: QueryOptions) => {
  return useQuery<SuccessResponse<IShipment>>({
    queryKey: ['shipment', id],
    queryFn: async () => {
      return await axiosGet(`/v1/admin/shipments/${id}`);
    },
    enabled: !!enabled,
  });
};

export const useUpdateShipment = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedShipment: any) => {
      return await axiosPut<any, any>(`/v1/admin/shipments/${id}`, updatedShipment);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(['shipment', id]).then((r) => null);
    },
  });
};
