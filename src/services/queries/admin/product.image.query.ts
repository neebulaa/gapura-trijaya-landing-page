import { axiosDelete, axiosGetAll, axiosPost } from '@/services/api/admin/api.service';
import { QueryParams } from '@/types/base';
import { IProductImage } from '@/types/productImage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProductImages = (params: QueryParams, productId: string) => {
  return useQuery({
    queryKey: ['productImages', { params }, productId],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IProductImage>(
        `/v1/admin/products/${productId}/images`,
        params
      );
    },
  });
};

export const useUploadProductImage = (productId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await axiosPost<any, any>(`/v1/admin/products/images/${productId}`, formData);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('productImages').then(() => null);
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiosDelete<any>(`/v1/admin/products/images/${id}`);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('productImages').then(() => null);
    },
  });
};
