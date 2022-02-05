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
  const { updateToken, updateUser } = useAuthContext();

  return useMutation(
    ({ email, password }) =>
      axios.post(getBackendApi('users/login/'), { email, password }),
    {
      ...config,
      onSuccess: ({ data }) => {
        updateUser({ data });
        updateToken(data.token);
      },
    }
  );
};
