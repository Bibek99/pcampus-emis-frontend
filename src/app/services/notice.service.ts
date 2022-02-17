import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
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

export const useFetchClassNotice = (
  config?: UseQueryOptions<any, any, any>,
  class_id?: string
) => {
  const { data, ...rest } = useQuery(['classNotice', class_id], () =>
    api.get(`notice/show/${class_id || ''}/`, {
      headers: authHeader(),
    })
  );
  const notice = data?.data.notice;
  const assignmentNotice = data?.data.assignmentnotice;

  const feeds = [...(notice || ''), ...(assignmentNotice || '')].sort(
    (a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at))
  );
  return { feeds, ...rest };
};
