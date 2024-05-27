import { AxiosRequestConfig } from 'axios';

export const axiosGetCategories = (
  isPublic = false
): AxiosRequestConfig<any> => {
  return {
    method: 'GET',
    url: `/v1/admin/categories${isPublic ? '/public' : ''}`,
  };
};

export const axiosGetCategory = (id: number): AxiosRequestConfig<any> => {
  return {
    method: 'GET',
    url: `/v1/admin/categories/${id}`,
  };
};

export const axiosCreateCategory = (): AxiosRequestConfig<any> => {
  return {
    method: 'POST',
    url: '/v1/admin/categories',
  };
};

export const axiosUpdateCategory = (id: number): AxiosRequestConfig<any> => {
  return {
    method: 'PATCH',
    url: `/v1/admin/categories/${id}`,
  };
};

export const axiosDeleteCategory = (id: number): AxiosRequestConfig<any> => {
  return {
    method: 'DELETE',
    url: `/v1/admin/categories/${id}`,
  };
};
