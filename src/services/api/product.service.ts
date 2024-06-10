import { api } from '@/commons/lib/api';

export const axiosGetProduct = async <T, U>(url: string, params?: T): Promise<U | null> => {
  // const res = await api.get<Pagination<U>, any>(url, {
  //   params: params,
  // });
  // return res.data;
  try {
    const res = await api.get<any>(url, {
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
