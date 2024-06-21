import { logger } from '@/commons/store/logger';
import { create } from 'zustand';
import { getCookie, setCookie } from '@/commons/lib/cookieStorage';

interface AuthState {
  isAuthenticated: boolean | string;
  token?: string | null;
}

export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated'], token?: AuthState['token']) => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: getCookie('isAuthenticated') ? true : false,
  token: getCookie('token') ?? null,
};

const useAuthStore = create<AuthStore>()(
  logger<AuthStore>(
    (set) => ({
      ...initialState,
      setIsAuthenticated: (isAuthenticated, token) => {
        set(() => ({ isAuthenticated, token }));
        setCookie('isAuthenticated', isAuthenticated, import.meta.env.VITE_TOKEN_EXPIRE);
        setCookie('token', token ? token : '', import.meta.env.VITE_TOKEN_EXPIRE);
        setCookie('refresh_token', token ? token : '', import.meta.env.VITE_REFRESH_EXPIRE);
      },
    }),
    'authStore',
  ),
);

export default useAuthStore;
