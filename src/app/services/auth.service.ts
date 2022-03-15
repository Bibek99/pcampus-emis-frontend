import { useAuthContext } from '@app/auth/AuthContext';
import api from './api';
import { useMutation, UseMutationOptions } from 'react-query';
import { authHeader } from './authheader';

export const useLogin = (
  config: UseMutationOptions<
    any, // Data : any
    unknown, // Error : unknown
    { email: string; password: string }
  > = {}
) => {
  const { updateToken, updateUser } = useAuthContext();

  return useMutation(
    ({ email, password }) => api.post('users/login/', { email, password }),
    {
      ...config,
      onSuccess: ({ data }) => {
        updateUser(data);
        updateToken(data.token);
      },
    }
  );
};

export const useResetPasswordSendEmail = (
  config: UseMutationOptions<any, any, { email: string }> = {}
) => {
  return useMutation(({ email }) => api.post('password_reset/', { email }), {
    ...config,
  });
};

export const useResetPasswordConfirm = (
  config: UseMutationOptions<any, any, any> = {}
) => {
  return useMutation(
    ({ password, token }) =>
      api.post('password_reset/confirm/', { password, token }),
    {
      ...config,
    }
  );
};
