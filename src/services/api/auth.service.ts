import { api } from '@/commons/lib/api';
import { AuthDto, RegisterDto } from '@/types/auth';

export const login = async (authDto: AuthDto): Promise<any> => {
  const response = await api.post<any>('/v1/auth/login', authDto);
  return response.data;
};

export const me = async (): Promise<any> => {
  const response = await api.post<any>('/v1/auth/me');
  return response.data;
};

export const register = async (registerDto: RegisterDto): Promise<any> => {
  const response = await api.post<any>('/v1/auth/register', registerDto);
  return response.data;
};

export const logout = async (): Promise<any> => {
  const response = await api.post<any>('/v1/auth/logout');
  return response.data;
};

export const refresh = async (): Promise<any> => {
  const response = await api.post<any>('/v1/auth/refresh');
  return response.data;
};
