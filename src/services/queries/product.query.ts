import { axiosGet, axiosGetAll } from '@/services/api/admin/api.service';
import { QueryParams } from '@/types/base';
import { IProduct } from '@/types/product';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { axiosGetProduct } from '../api/product.service';

export const useGetProducts = (params: QueryParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['products', { params }],
    queryFn: async () => {
      return await axiosGetAll<QueryParams, IProduct>(`/v1/products`, params);
    },
    enabled,
  });
};

export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['product', { slug }],
    queryFn: async () => {
      return await axiosGet<any>(`/v1/products/${slug}`);
    },
  });
};

export const useGetProductByQuery = (slug: string, params: any) => {
  return useQuery({
    queryKey: ['productQuery', { slug }, { params }],
    queryFn: async () => {
      return await axiosGetProduct<any, any>(`/v1/product-query/${slug}`, params);
    },
    enabled: !!slug,
    // staleTime: 0, // Always stale
  });
};
