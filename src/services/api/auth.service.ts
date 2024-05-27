import { api } from '@/commons/lib/api';
import { AuthDto } from '@/types/auth';

export const login = async (authDto: AuthDto): Promise<any> => {
  const response = await api.post<any>('/v1/auth/login', authDto);
  return response.data;
};

export const me = async (): Promise<any> => {
  const response = await api.post<any>('/v1/auth/me');
  return response.data;
};
