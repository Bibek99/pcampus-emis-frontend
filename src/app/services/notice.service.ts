import { config } from 'process';
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

export const useCreateGlobalNotice = (
  config: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (globalNotice) =>
      api.post('notice/global/create/', globalNotice, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data; boundary=999999999999',
        },
      }),
    {
      ...config,
    }
  );
};

export const useFetchAllGlobalNotice = () => {
  const { data, ...rest } = useQuery(['globalNotice'], () =>
    api.get('notice/show/global/all/', {
      headers: authHeader(),
    })
  );
  const globalNotices = data?.data;
  return { globalNotices, ...rest };
};

export const useFetchGlobalNoticeDetail = (noticeId?: string) => {
  const { data, ...rest } = useQuery(['globalNotice-detail', noticeId], () =>
    api.get(`notice/show/global/detail/${noticeId || ''}/`, {
      headers: authHeader(),
    })
  );
  const globalNotice = data?.data;
  return { globalNotice, ...rest };
};

export const useCreateDepartmentNotice = (
  config: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (deptNotice) =>
      api.post('notice/dept/create/', deptNotice, {
        headers: {
          ...authHeader(),
          'Content-Type': 'multipart/form-data; boundary=999999999999',
        },
      }),
    {
      ...config,
    }
  );
};

export const useFetchAllDeptNotice = (userId?: number) => {
  const { data, ...rest } = useQuery(['dept-notices'], () =>
    api.get(`notice/dept/show/all/${userId || ''}`, {
      headers: authHeader(),
    })
  );
  const deptNotices = data?.data;
  return { deptNotices, ...rest };
};

export const useFetchDeptNoticeDetail = (noticeId?: string) => {
  const { data, ...rest } = useQuery(['dept-notice-detail', noticeId], () =>
    api.get(`notice/dept/show/${noticeId || ''}/`, {
      headers: authHeader(),
    })
  );
  const deptNotice = data?.data;
  return { deptNotice, ...rest };
};

export const useGlobalNoticeDelete = (
  config?: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (noticeId) =>
      api.delete(`notice/global/delete/${noticeId || ''}/`, {
        headers: authHeader(),
      }),
    {
      ...config,
    }
  );
};

export const useDepartmentNoticeDelete = (
  config?: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (noticeId) =>
      api.delete(`notice/dept/delete/${noticeId || ''}/`, {
        headers: authHeader(),
      }),
    {
      ...config,
    }
  );
};
