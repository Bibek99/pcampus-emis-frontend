import { AdminRoutes } from '@app/elements/routes';
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
      routes = AdminRoutes;
      break;
    case 'DEPT_ADMIN':
      routes = AdminRoutes;
      break;
    case 'TEACHER':
      routes = AdminRoutes;
      break;
    case 'STUDENT':
      routes = AdminRoutes;
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
