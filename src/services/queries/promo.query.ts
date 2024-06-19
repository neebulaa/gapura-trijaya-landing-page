import { IPromo, PromoQuery } from '@/types/promo.ts';
import { useQuery } from '@tanstack/react-query';
import { axiosGet, axiosGetAll } from '@/services/api/admin/api.service.ts';

export const useGetPublicPromos = (params: PromoQuery) => {
  return useQuery({
    queryKey: ['products', 'public', { params }],
    queryFn: async () => {
      return await axiosGetAll<PromoQuery, IPromo>('/v1/promos', params);
    },
  });
};

export const useGetPublicPromo = (id: string) => {
  return useQuery({
    queryKey: ['promos', 'public', { id }],
    queryFn: async () => {
      return await axiosGet<IPromo>(`/v1/promos/${id}`);
    },
  });
};
