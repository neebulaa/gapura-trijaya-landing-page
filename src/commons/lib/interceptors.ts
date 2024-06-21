import { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { LogoutUserSession } from '@/commons/utils/Abilities/UserSessionPersistent';
import { message } from 'antd';
import { getCookie } from './cookieStorage';
import useUserStore from '@/commons/store/useUserStore.ts';
import useAuthStore from '@/commons/store/useAuthStore.ts';
import { refresh } from '@/services/api/auth.service.ts';
import { redirect } from 'react-router-dom';
import { api } from '@/commons/lib/api.ts';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
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
  // @ts-ignore
  if (error.response?.status === 401 && error.response?.data?.message !== 'Token not refreshed') {
    const { setIsAuthenticated } = useAuthStore.getState();
    const { setUserData } = useUserStore.getState();

    await refresh()
      .then((res) => {
        setIsAuthenticated(true, res.authorization.accessToken);
        setUserData(res.user);
        // @ts-ignore
        api
          .request({
            ...error.config,
            headers: {
              ...error.config?.headers,
              Authorization: `Bearer ${res.authorization.accessToken}`,
            },
          })
          .then((res) => {
            // @ts-ignore
            if (res.data.message?.includes('logged out')) {
              message.info('You have been logged out');
              LogoutUserSession();
              redirect('/login');
            }
          });
      })
      .catch(() => {
        setIsAuthenticated(false, null);
        setUserData(null);
        LogoutUserSession();
        redirect('/login');
      });

    // removeCookie('token');
    // removeCookie('isAuthenticated');
    // removeItem('userData');

    await Promise.reject(error);
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
