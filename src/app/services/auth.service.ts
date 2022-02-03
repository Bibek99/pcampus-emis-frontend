import { useAuthContext } from '@app/auth/AuthContext';
import { getBackendApi } from '@utils/getBackendApi';
import Axios from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';

export const useLogin = (
  config: UseMutationOptions<
    any, // Data : any
    unknown, // Error : unknown
    { email: string; password: string }
  > = {}
) => {
  const { updateToken } = useAuthContext();

  return useMutation(
    ({ email, password }) =>
      Axios.post(getBackendApi('/users/login'), { email, password }),
    {
      ...config,
      onSuccess: (data, ...rest) => {
        updateToken(data.token);
        if (config.onSuccess) {
          config.onSuccess(data, ...rest);
        }
      },
    }
  );
};
