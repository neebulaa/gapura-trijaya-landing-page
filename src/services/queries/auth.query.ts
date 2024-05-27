import { login } from '@/services/api/auth.service';
import { AuthDto } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';

export const useLoginQuery = () =>
  useMutation({
    mutationFn: async (body: AuthDto) => {
      const res = await login(body);
      return res;
    },
  });
