import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useCreateFolder = (
  config: UseMutationOptions<any, any, any>,
  class_id?: string,
  teacher_id?: string
) => {
  return useMutation(
    (folder_name) =>
      api.post(
        `create/folder/${class_id || ''}/${teacher_id || ''}/`,
        folder_name,
        {
          headers: authHeader(),
        }
      ),
    {
      ...config,
    }
  );
};

export const useFetchFolders = (class_id: string) => {
  return useQuery(['fetch-folders', class_id], () =>
    api.get(`show/all/folder/${class_id || ''}/`, {
      headers: authHeader(),
    })
  );
};
