import { useMutation, UseMutationOptions } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useCreateAssignment = (
  config?: UseMutationOptions<any, any, any>,
  class_id?: string,
  teacher_id?: string
) => {
  return useMutation(
    (newAssignment) =>
      api.post(
        `assignment/create/${class_id || ''}/${teacher_id || ''}/`,
        newAssignment,
        {
          headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data; boundary=999999999999',
          },
        }
      ),
    {
      ...config,
    }
  );
};
