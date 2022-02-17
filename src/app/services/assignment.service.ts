import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
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

export const useFetchAssignments = (class_id?: string) => {
  return useQuery(['assignments', class_id], () =>
    api.get(`assignment/show/all/${class_id || ''}/`, {
      headers: authHeader(),
    })
  );
};

export const useFetchAssignmentDetails = (assignmentId?: string) => {
  const { data, ...rest } = useQuery(['fetch-assignments', assignmentId], () =>
    api.get(`assignment/show/${assignmentId || ''}/`, {
      headers: authHeader(),
    })
  );

  const assignmentData = data?.data;
  return { assignmentData, ...rest };
};

export const useSubmitAssignment = (
  config?: UseMutationOptions<any, any, any>,
  assignment_id?: string,
  student_id?: string
) => {
  return useMutation(
    (studentFiles) =>
      api.post(
        `assignment/submit/${assignment_id || ''}/${student_id || ''}/`,
        studentFiles,
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
