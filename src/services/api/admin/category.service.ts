import { api } from '@/commons/lib/api';
import { QueryParams } from '@/types/base';

export const getCategories = async (params: QueryParams): Promise<any> => {
  const response = await api.get<any>('/v1/admin/categories', {
    params: params,
  });
  return response.data;
};
