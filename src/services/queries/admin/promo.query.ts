import { IPromo, PromoQuery } from '@/types/promo.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  axiosDelete,
  axiosGet,
  axiosGetAll,
  axiosPost,
  axiosPut,
} from '@/services/api/admin/api.service.ts';
import { QueryOptions } from '@/types/global/queryOptions.ts';
import { IndexDto } from '@/types/global/indexDto.ts';
import { useNavigate } from 'react-router-dom';

export const useGetPromos = (query: PromoQuery) => {
  return useQuery({
    queryKey: ['promos', query],
    queryFn: async () => {
      return await axiosGetAll<PromoQuery, IPromo>('/v1/admin/promos', query);
    },
  });
};

export const useGetPromo = (id: string, { enabled }: QueryOptions = {}) => {
  return useQuery({
    queryKey: ['promos', id],
    queryFn: async () => {
      return await axiosGet<IPromo>(`/v1/admin/promos/${id}`);
    },
    enabled: !!enabled,
  });
};

export const useCreatePromo = <T>(redirect: boolean = false) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (newPromo: T) => {
      return await axiosPost('/v1/admin/promos', newPromo);
    },
    onSuccess: () => {
      if (redirect) navigate(-1);
    },
  });
};

export const useUpdatePromo = <T>(id: string, redirect: boolean = false) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (updatedPromo: T) => {
      return await axiosPut(`/v1/admin/promos/${id}`, updatedPromo);
    },
    onSuccess: () => {
      if (redirect) navigate(-1);
    },
  });
};

export const useDeletePromo = <T>(redirect: boolean = false) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: T & IndexDto) => {
      return await axiosDelete(`/v1/admin/promos/${body.id}`);
    },
    onSuccess: async () => {
      //@ts-ignore
      await queryClient.invalidateQueries('promos');
      if (redirect) navigate(-1);
    },
  });
};
