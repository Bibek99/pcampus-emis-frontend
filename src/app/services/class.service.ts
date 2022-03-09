import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useCreateClass = (config?: UseMutationOptions<any, any, any>) => {
  return useMutation(
    (newClass) =>
      api.post(
        'create/class/',
        { ...newClass },
        {
          headers: authHeader(),
        }
      ),
    {
      ...config,
    }
  );
};

export const useFetchStudentClass = (student_id?: string) => {
  return useQuery(['fetch-student-class'], () =>
    api.get(`show/class/by/student/${student_id || ''}/`, {
      headers: authHeader(),
    })
  );
};

export const useFetchClass = (role: string, userId?: string) => {
  let url = 'show/class/all/';
  if (role === 'DEPT_ADMIN') {
    url = `show/class/by/department/${userId || ''}/`;
  } else if (role === 'TEACHER') {
    url = `show/class/by/teacher/${userId || ''}/`;
  } else if (role === 'STUDENT') {
    url = `show/class/by/student/${userId || ''}/`;
  }
  const { data, ...rest } = useQuery('fetch-classes', () =>
    api.get(url, {
      headers: authHeader(),
    })
  );
  const classData = data?.data;
  return { classData, ...rest };
};

export const useFetchClassDetail = (class_id?: string) => {
  const { data, ...rest } = useQuery(['fetch-class-detail', class_id], () =>
    api.get(`show/class/${class_id || ''}/`, {
      headers: authHeader(),
    })
  );
  const classData = data?.data;
  const students = data?.data.student;
  const teachers = data?.data.teacher;
  return { classData, students, teachers, ...rest };
};

export const useFetchStudentsInAClass = (class_id?: string) => {
  const { data, ...rest } = useQuery(
    ['fetch-students-in-a-class', class_id],
    () =>
      api.get(`show/students/in/class/${class_id || ''}/`, {
        headers: authHeader(),
      })
  );
  const students = data?.data;
  return { students, ...rest };
};

export const useDeleteClassFeed = (
  config?: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (feedId) =>
      api.delete(`notice/delete/${feedId || ''}/`, {
        headers: authHeader(),
      }),
    {
      ...config,
    }
  );
};
