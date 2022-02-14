import { useAuthContext } from '@app/auth/AuthContext';
import {
  adminRoutes,
  studentRoutes,
  teacherRoutes,
} from '@app/elements/routes';
import { AuthenticatedRouteGuard } from '@app/router/guards';
import { useUserRole } from '@app/services/account.service';
import React, { useEffect } from 'react';
import DashboardPage from './DashboardPage';
import DashboardRoutes from './DashboardRoutes';

export const RoleBasedDashboardWrapper = () => {
  const { role, isLoading } = useUserRole();
  const { setRole } = useAuthContext();
  let routes;

  useEffect(() => setRole(role?.data), [role?.data]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  switch (role?.data) {
    case 'ADMIN':
      routes = adminRoutes;
      break;
    case 'DEPT_ADMIN':
      routes = adminRoutes;
      break;
    case 'TEACHER':
      routes = adminRoutes;
      break;
    case 'STUDENT':
      routes = adminRoutes;
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
