import { api } from '@/commons/lib/api.ts';
import { Pagination, SuccessResponse } from '@/types/base.ts';

export const axiosGetAll = async <T, U>(url: string, params?: T): Promise<Pagination<U>> => {
  const res = await api.get<Pagination<U>, any>(url, {
    params: params
  });
  return res.data;
};

export const axiosGet = async <U>(url: string): Promise<SuccessResponse<U>> => {
  const res = await api.get<SuccessResponse<U>, any>(url);
  return res.data;
};

export const axiosPost = async <T, U>(url: string, data: T): Promise<SuccessResponse<U>> => {
  const res = await api.post<SuccessResponse<U>, any>(url, data);
  return res.data;
};

export const axiosPut = async <T, U>(url: string, data: T): Promise<SuccessResponse<U>> => {
  const res = await api.put<SuccessResponse<U>>(url, data);
  return res.data;
};

export const axiosDelete = async <U>(url: string): Promise<SuccessResponse<U>> => {
  const res = await api.delete<SuccessResponse<U>>(url);
  return res.data;
};