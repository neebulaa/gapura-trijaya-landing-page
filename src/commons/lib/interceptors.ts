import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
// import { redirect } from 'react-router-dom';
import useAuthStore from '@/commons/store/useAuthStore';
import { getCookie, removeCookie } from './cookieStorage';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // NOTE: Simple token logic
  // const currentDate = new Date();
  const token = getCookie('token');
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;

  // NOTE: Token refresh logic with expired token
  // Soon to be implemented
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    removeCookie('token');
    removeCookie('isAuthenticated');

    const { setIsAuthenticated } = useAuthStore.getState();
    setIsAuthenticated(false, null);

    await Promise.reject(error);
    // redirect('/login');
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      console.error(errorMessage);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};
