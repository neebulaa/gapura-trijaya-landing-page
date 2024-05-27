import { QueryParams } from '@/types/base';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosDelete, axiosGet, axiosGetAll, axiosPost, axiosPut } from '@/services/api/admin/api.service.ts';

export const useGetCategories = (params: QueryParams) => {
  return useQuery({
    queryKey: ['categories', { params }],
    queryFn: async () => {
      const res = await axiosGetAll(`/v1/admin/categories`, params);
      return res;
    }
  });
};

export const useGetCategory = (id: string) => {
  return useQuery(['category', id], () => axiosGet(`/v1/admin/categories/${id}`));
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newCategory: any) => axiosPost<any, any>('/v1/admin/categories', newCategory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },
    }
  );
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (updatedCategory: any) => axiosPut<any, any>(`/v1/admin/categories/${id}`, updatedCategory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        queryClient.invalidateQueries(['category', id]);
      },
    }
  );
};

export const useDeleteCategory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => axiosDelete<any>(`/v1/admin/categories/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },
    }
  );
};
