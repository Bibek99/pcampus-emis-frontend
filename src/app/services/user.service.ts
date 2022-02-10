import { User } from '@app/types/users.types';
import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

interface UserRoleType {
  role: 'student' | 'department' | 'staff' | 'admin';
}

export const useCreateAccount = (
  config: UseMutationOptions<User, any, any>
) => {
  const booleans = {
    admin: 'False',
    student: 'True',
    staff: 'False',
    department: 'False',
  };
  return useMutation(
    (newStudent) => api.post('register/user/', { ...newStudent, ...booleans }),
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

export const useFetchSection = () => {
  const header = authHeader();
  return useQuery('fetch-section', () =>
    api.get('view/section/', {
      headers: header,
    })
  );
};
