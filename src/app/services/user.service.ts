import { useMutation, useQuery } from 'react-query';
import api from './api';

interface UserType {
  role: 'student' | 'department' | 'staff' | 'admin';
}

export const useCreateAccount = () => {
  return useMutation(() => api.post('register/user/', {}));
};

export const useFetchBatch = () => {
  return useQuery('batch', () =>
    api.get('view/batch/', {
      // headers: {
      //   Authorization: `Bearer ${access}`,
      // },
    })
  );
};
