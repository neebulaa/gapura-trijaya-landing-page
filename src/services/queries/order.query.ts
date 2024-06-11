import { useMutation } from '@tanstack/react-query';
import { axiosPost } from '@/services/api/admin/api.service';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (newOrder: any) => {
      return await axiosPost<any, any>('/v1/order/checkout', newOrder);
    },
  });
};
