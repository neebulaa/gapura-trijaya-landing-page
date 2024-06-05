import { axiosDelete, axiosGetAll, axiosPost, axiosPut } from '@/services/api/admin/api.service';
import { ICart } from '@/types/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetCarts = () => {
  return useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      return await axiosGetAll<any, ICart>(`/v1/cart`);
    },
  });
};

export const useCreateCart = () => {
  return useMutation({
    mutationFn: async (newItem: any) => {
      return await axiosPost<any, any>('/v1/cart', newItem);
    },
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedCart: any) => {
      return await axiosPut<any, any>(`/v1/cart/${updatedCart.id}`, updatedCart.updatedCart);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('carts').then((r) => null);
    },
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await axiosDelete<any>(`/v1/cart/${id}`);
    },
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries('carts').then((r) => null);
    },
  });
};
