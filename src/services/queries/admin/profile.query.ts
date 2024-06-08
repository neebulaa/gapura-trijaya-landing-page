import { axiosGet, axiosPut } from '@/services/api/admin/api.service';
import { IUser } from '@/types/user';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetUserProfile = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      return await axiosGet<IUser>(`/v1/admin/users/${id}`);
    },
  });
};

export const useUpdateUserProfile = (id: string) => {
  return useMutation({
    mutationFn: async (updatedUser: any) => {
      return await axiosPut<any, any>(`/v1/admin/profile/${id}`, updatedUser);
    },
  });
};
