import {
  axiosDelete,
  axiosGet,
  axiosGetAll,
  axiosPost,
  axiosPut,
} from '@/services/api/admin/api.service.ts';
import { IAttribute } from '@/types/attribute';
import { QueryParams, SuccessResponse } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetAttributes = (params: QueryParams) => {
  return useQuery({
    queryKey: ['attributes', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IAttribute>(`/v1/admin/attributes`, params);
    },
  });
};

export const useGetAttribute = (id: string, { enabled }: QueryOptions = {}) => {
  return useQuery<SuccessResponse<IAttribute>>({
    queryKey: ['attribute', id],
    queryFn: async () => {
      return axiosGet(`/v1/admin/attributes/${id}`);
    },
    enabled: !!enabled,
  });
};

export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: async (newAttribute: any) => {
      return await axiosPost<any, any>('/v1/admin/attributes', newAttribute);
    },
  });
};

export const useUpdateAttribute = (id: string) => {
  return useMutation({
    mutationFn: async (updatedAttribute: any) => {
      return await axiosPut<any, any>(`/v1/admin/attributes/${id}`, updatedAttribute);
    },
  });
};

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiosDelete<any>(`/v1/admin/attributes/${id}`);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('attributes').then((r) => null);
    },
  });
};
