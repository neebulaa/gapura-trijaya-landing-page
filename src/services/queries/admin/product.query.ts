import {
  axiosDelete,
  axiosGet,
  axiosGetAll,
  axiosPost,
  axiosPut,
} from '@/services/api/admin/api.service.ts';
import { QueryParams } from '@/types/base';
import { QueryOptions } from '@/types/global/queryOptions';
import { IProduct } from '@/types/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProducts = (params: QueryParams) => {
  return useQuery({
    queryKey: ['products', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IProduct>(
        `/v1/admin/products`,
        params
      );
    },
  });
};

export const useGetProduct = (id: string, { enabled }: QueryOptions = {}) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      return axiosGet(`/v1/admin/products/${id}`);
    },
    enabled: !!enabled,
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (newProduct: any) => {
      return await axiosPost<any, any>('/v1/admin/products', newProduct);
    },
  });
};

export const useUpdateProduct = (id: string) => {
  return useMutation({
    mutationFn: async (updatedProduct: any) => {
      return await axiosPut<any, any>(
        `/v1/admin/products/${id}`,
        updatedProduct
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiosDelete<any>(`/v1/admin/products/${id}`);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('products').then((r) => null);
    },
  });
};
