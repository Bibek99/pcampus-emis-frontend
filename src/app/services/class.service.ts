import { useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

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
  return useQuery('fetch-classes', () =>
    api.get(url, {
      headers: authHeader(),
    })
  );
};
