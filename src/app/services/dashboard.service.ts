import { useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useAdminDashboardService = () => {
  const { data, ...rest } = useQuery(['admin-dashboard'], () =>
    api.get('show/admin/dashboard/', {
      headers: authHeader(),
    })
  );
  const adminDashboardData = data?.data;
  return { adminDashboardData, ...rest };
};
