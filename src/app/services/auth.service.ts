import { useAuthContext } from '@app/auth/AuthContext';
import API from './api';
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
    ({ email, password }) => API.post('users/login/', { email, password }),
    {
      ...config,
      onSuccess: ({ data }) => {
        updateUser(data);
        updateToken(data.token);
      },
    }
  );
};
