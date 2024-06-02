import { login, register } from '@/services/api/auth.service';
import { AuthDto, RegisterDto } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useLoginQuery = () =>
  useMutation({
    mutationFn: async (body: AuthDto) => {
      const res = await login(body);
      return res;
    },
  });

export const useRegisterQuery = () =>
  useMutation({
    mutationFn: async (body: RegisterDto) => {
      const res = await register(body);
      return res;
    },
  });
