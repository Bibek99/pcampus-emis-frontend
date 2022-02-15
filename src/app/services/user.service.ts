import { User } from '@app/types/users.types';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export interface UserRoleType {
  role: 'STUDENT' | 'DEPT_ADMIN' | 'TEACHER' | 'ADMIN';
}

export const useCreateStudentAccount = (
  config: UseMutationOptions<User, any, any>
) => {
  const booleans = {
    admin: 'False',
    student: 'True',
    staff: 'False',
    department: 'False',
    password_changed: 'False',
  };
  return useMutation(
    (newStudent) =>
      api.post('register/user/', {
        ...newStudent,
        ...booleans,
      }),
    {
      ...config,
    }
  );
};

export const useCreateStudentsInBulk = (
  config?: UseMutationOptions<any, any, any>
) => {
  const header = authHeader();

  return useMutation(
    (files) =>
      api.post('import/user/', files, {
        headers: {
          ...header,
          'Content-Type': 'multipart/form-data; boundary=999999999999',
        },
      }),
    {
      ...config,
    }
  );
};

export const useGetStudents = (config?: UseQueryOptions) => {
  const header = authHeader();
  return useQuery('get-students', () =>
    api.get('show/all_students/', {
      headers: header,
    })
  );
};

export const useGetTeachers = () => {
  const header = authHeader();
  return useQuery('get-teachers', () =>
    api.get('show/all_teacher/', {
      headers: header,
    })
  );
};

export const useCreateTeacherAccount = (
  config: UseMutationOptions<User, any, any>
) => {
  const booleans = {
    admin: 'False',
    student: 'False',
    staff: 'True',
    department: 'False',
    password_changed: 'False',
  };
  return useMutation(
    (newTeacher) =>
      api.post('/register/user/', {
        ...newTeacher,
        ...booleans,
      }),
    {
      ...config,
    }
  );
};

export const useCreateDepartment = (
  config: UseMutationOptions<any, any, any>
) => {
  return useMutation(
    (newDepartment) => api.post('register/department/', { ...newDepartment }),
    {
      ...config,
    }
  );
};

export const useFetchBatch = () => {
  const header = authHeader();
  return useQuery('fetch-batch', () =>
    api.get('view/batch/', {
      headers: header,
    })
  );
};

export const useFetchDepartment = () => {
  const header = authHeader();
  return useQuery('fetch-department', () =>
    api.get('view/department/', {
      headers: header,
    })
  );
};

export const useFetchClass = () => {
  const header = authHeader();
  return useQuery('fetch-classes', () =>
    api.get('show/class/all/', {
      headers: header,
    })
  );
};

export const useFetchSection = () => {
  const header = authHeader();
  return useQuery('fetch-section', () =>
    api.get('view/section/', {
      headers: header,
    })
  );
};
