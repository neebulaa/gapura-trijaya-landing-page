import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
// import { redirect } from 'react-router-dom';
import { LogoutUserSession } from '@/commons/utils/Abilities/UserSessionPersistent';
import { message } from 'antd';
import { getCookie } from './cookieStorage';

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
  // NOTE: Redirect to login page if token is expired
  // 401: Unauthorized
  if (error.response?.status === 401) {
    // const { setIsAuthenticated } = useAuthStore.getState();
    // const { setUserData } = useUserStore.getState();

    // setIsAuthenticated(false, null);
    // setUserData(null);

    // removeCookie('token');
    // removeCookie('isAuthenticated');
    // removeItem('userData');

    LogoutUserSession();

    await Promise.reject(error);
    // redirect('/login');
  } else {
    console.log('Interceptor error: ', error);

    if (error?.code === 'ERR_NETWORK') {
      message.error('Problem with the server, please try again later.');
    }

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
