import { QueryParams } from '@/types/base';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosDelete, axiosGet, axiosGetAll, axiosPost, axiosPut } from '@/services/api/admin/api.service.ts';

export const useGetCategories = (params: QueryParams) => {
  return useQuery({
    queryKey: ['categories', { params }],
    queryFn: async () => {
      return await axiosGetAll(`/v1/admin/categories`, params);
    }
  });
};

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      return axiosGet(`/v1/admin/categories/${id}`);
    }
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (newCategory: any) => {
      return await axiosPost<any, any>('/v1/admin/categories', newCategory);
    }
  });
};

export const useUpdateCategory = (id: string) => {
  return useMutation({
      mutationFn: async (updatedCategory: any) => {
        return await axiosPut<any, any>(`/v1/admin/categories/${id}`, updatedCategory);
      }
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: async (id: string) => {
        return await axiosDelete<any>(`/v1/admin/categories/${id}`);
      },
      onSuccess: () => {
        // @ts-ignore
        queryClient.invalidateQueries('categories').then(r => null);
      }
    }
  );
};
