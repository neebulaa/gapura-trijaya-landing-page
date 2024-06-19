import { IPromo, PromoQuery } from '@/types/promo.ts';
import { useQuery } from '@tanstack/react-query';
import { axiosGet, axiosGetAll } from '@/services/api/admin/api.service.ts';

export const useGetPublicPromos = (params: PromoQuery, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['products', 'public', { params }],
    queryFn: async () => {
      return await axiosGetAll<PromoQuery, IPromo>('/v1/promos', params);
    },
    enabled,
  });
};

export const useGetPublicPromoByCode = (code: string) => {
  return useQuery({
    queryKey: ['promos', 'public', 'code', { code }],
    queryFn: async () => {
      return await axiosGet<IPromo>(`/v1/promos/code/${code}`);
    },
    enabled: !!code,
  });
};
