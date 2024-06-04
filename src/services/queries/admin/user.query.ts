import { axiosGetAll } from '@/services/api/admin/api.service';
import { QueryParams } from '@/types/base';
import { IUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = (params: QueryParams) => {
  return useQuery({
    queryKey: ['users', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IUser>(`/v1/admin/users`, params);
    },
  });
};
