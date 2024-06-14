import { axiosGet, axiosGetAll } from '@/services/api/admin/api.service';
import { QueryParams, SuccessResponse } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions.ts';
import { IShipment } from '@/types/shipment';
import { useQuery } from '@tanstack/react-query';

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
