import { useMutation, UseMutationOptions } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const usecreateClassNotice = (
  config?: UseMutationOptions<any, any, any>,
  class_id?: string,
  user_id?: string
) => {
  return useMutation(
    (newClassNotice) =>
      api.post(
        `notice/create/${class_id || ''}/${user_id || ''}/`,
        newClassNotice,
        {
          headers: authHeader(),
        }
      ),
    {
      ...config,
    }
  );
};
