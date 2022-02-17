import { AUTH_TOKEN_KEY } from '@constants/auth';
import { useQuery, UseQueryOptions } from 'react-query';
import api from './api';
import { authHeader, getAccessToken } from './authheader';

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

export const useUserRole = (config: UseQueryOptions = {}) => {
  const { data: role, ...rest } = useQuery(
    ['role'],
    (): Promise<any> =>
      api.post(
        'users/self/role',
        {
          access: getAccessToken(),
        },
        {
          headers: authHeader(),
        }
      )
  );

  return { role, ...rest };
};

export const useUserDept = (config: UseQueryOptions = {}) => {
  const { data: department, ...rest } = useQuery(
    ['department'],
    (): Promise<any> =>
      api.post(
        'users/self/department/',
        {
          access: getAccessToken(),
        },
        {
          headers: authHeader(),
        }
      )
  );

  return { department, ...rest };
};
