import { useQuery } from '@tanstack/react-query';
import { verifyTokenAPI } from '@/api/auth';
import type { IVerifyTokenRequest } from '@/interfaces/user';

export const useVerifyToken = (tokenData: IVerifyTokenRequest) => {
  return useQuery({
    queryKey: ['auth', tokenData],
    queryFn: () => verifyTokenAPI(tokenData),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
