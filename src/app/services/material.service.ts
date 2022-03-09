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

export const useFetchFolderDetail = (folder_id?: string) => {
  const { data, ...rest } = useQuery(['fetch-folderDetails', folder_id], () =>
    api.get(`show/folder/${folder_id || ''}/`, {
      headers: authHeader(),
    })
  );
  const folderDetail = data?.data;
  return { folderDetail, ...rest };
};

export const useFetchAllMaterialsInFolder = (folder_id?: string) => {
  const { data, ...rest } = useQuery(['fetch-materials', folder_id], () =>
    api.get(`show/all/materials/${folder_id || ''}/`, {
      headers: authHeader(),
    })
  );
  const materials = data?.data;
  return { materials, ...rest };
};

export const useUploadMaterials = (
  config: UseMutationOptions<any, any, any>,
  folder_id?: string
) => {
  return useMutation(
    (files) =>
      api.post(`upload/materials/${folder_id || ''}/`, files, {
        headers: {
          ...authHeader(),
          'Content-Type':
            'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        },
      }),
    {
      ...config,
    }
  );
};

export const useMaterialDelete = (
  config?: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (materialId) =>
      api.delete(`delete/materials/${materialId || ''}/`, {
        headers: authHeader(),
      }),
    {
      ...config,
    }
  );
};

export const useFolderDelete = (config?: UseMutationOptions<any, any, any>) => {
  return useMutation(
    (folderId) =>
      api.delete(`delete/folder/${folderId || ''}/`, {
        headers: authHeader(),
      }),
    {
      ...config,
    }
  );
};
