import { AUTH_TOKEN_KEY } from '@constants/auth';
import { useQuery, UseQueryOptions } from 'react-query';
import api from './api';

export const useAccount = (config: UseQueryOptions = {}) => {
  const { data: account, ...rest } = useQuery(
    ['account'],
    (): Promise<any> =>
      api.post('users/token/verify/', {
        token: localStorage.getItem(AUTH_TOKEN_KEY) || '-',
      })
  );

  return { account, ...rest };
};
