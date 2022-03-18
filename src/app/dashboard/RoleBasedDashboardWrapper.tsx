import { useAuthContext } from '@app/auth/AuthContext';
import {
  adminRoutes,
  departmentAdminRoutes,
  studentRoutes,
  teacherRoutes,
} from '@app/elements/routes';
import { Loader } from '@app/layout';
import { AuthenticatedRouteGuard } from '@app/router/guards';
import { useUserDept, useUserRole } from '@app/services/account.service';
import React, { useEffect } from 'react';
import DashboardPage from './DashboardPage';
import DashboardRoutes from './DashboardRoutes';

export const RoleBasedDashboardWrapper = () => {
  const { role, isLoading } = useUserRole();
  const { department, isLoading: isDepartmentLoading } = useUserDept();
  console.log('department', department);

  const { setRole, setDepartment } = useAuthContext();

  let routes;

  useEffect(() => {
    setRole(role?.data);
    setDepartment(department);
  }, [role?.data, department]);

  if (isLoading || isDepartmentLoading) {
    return <Loader />;
  }

  switch (role?.data) {
    case 'ADMIN':
      routes = adminRoutes;
      break;
    case 'DEPT_ADMIN':
      routes = departmentAdminRoutes;
      break;
    case 'TEACHER':
      routes = teacherRoutes;
      break;
    case 'STUDENT':
      routes = studentRoutes;
      break;
    default:
      break;
  }
  return (
    <AuthenticatedRouteGuard>
      <DashboardPage routes={routes}>
        <DashboardRoutes role={role?.data} />
      </DashboardPage>
    </AuthenticatedRouteGuard>
  );
};
