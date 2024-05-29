import { api } from '@/commons/lib/api.ts';
import { Pagination, SuccessResponse } from '@/types/base.ts';

/**
 * Get all data
 */
export const axiosGetAll = async <T, U>(url: string, params?: T): Promise<Pagination<U> | null> => {
  // const res = await api.get<Pagination<U>, any>(url, {
  //   params: params,
  // });
  // return res.data;
  try {
    const res = await api.get<Pagination<U>, any>(url, {
      params: params,
    });
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log(`Error 429: ${error.response.data.message}`);
      return null;
    }
    if (error.response && error.response.status === 429) {
      console.log(`Error 429: ${error.response.data.message}`);
    }
    throw error; // Rethrow the error so it can be handled by the caller if needed
  }
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
