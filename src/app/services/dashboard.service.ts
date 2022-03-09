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

export const useStudentDashboardService = (userId?: number) => {
  const { data, ...rest } = useQuery(['student-dashboard'], () =>
    api.get(`show/student/dashboard/${userId || ''}`, {
      headers: authHeader(),
    })
  );
  const studentDashboardData = data?.data;
  return { studentDashboardData, ...rest };
};

export const useTeacherDashboardService = (userId?: number) => {
  const { data, ...rest } = useQuery(['teacher-dashboard'], () =>
    api.get(`show/teacher/dashboard/${userId || ''}`, {
      headers: authHeader(),
    })
  );
  const teacherDashboardData = data?.data;
  return { teacherDashboardData, ...rest };
};
