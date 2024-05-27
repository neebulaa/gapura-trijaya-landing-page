import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from '@/commons/lib/interceptors';
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL as string,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
