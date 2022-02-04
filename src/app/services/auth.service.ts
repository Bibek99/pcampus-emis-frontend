import { useAuthContext } from '@app/auth/AuthContext';
import { getBackendApi } from '@utils/getBackendApi';
import axios from 'axios';
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
      axios.post(
        getBackendApi('users/login/'),
        { email, password },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      ),
    {
      mutationKey: 'login',
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
