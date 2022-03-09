import { useAuthContext } from '@app/auth/AuthContext';
import api from './api';
import { useMutation, UseMutationOptions } from 'react-query';

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

export const useManualPasswordReset = (
  config: UseMutationOptions<any, any, { email: string }> = {}
) => {
  return useMutation(({ email }) => api.post('/password_reset/', { email }), {
    ...config,
  });
};
