import {
  adminRoutes,
  studentRoutes,
  teacherRoutes,
} from '@app/elements/routes';
import { AuthenticatedRouteGuard } from '@app/router/guards';
import { useUserRole } from '@app/services/account.service';
import React from 'react';
import DashboardPage from './DashboardPage';
import DashboardRoutes from './DashboardRoutes';

export const RoleBasedDashboardWrapper = () => {
  const { role, isLoading } = useUserRole();
  let routes;

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
      return <h1>No role</h1>;
  }
  return (
    <AuthenticatedRouteGuard>
      <DashboardPage routes={routes}>
        <DashboardRoutes role={role?.data} />
      </DashboardPage>
    </AuthenticatedRouteGuard>
  );
};
