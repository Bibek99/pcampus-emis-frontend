import Error404 from '@errors/Error404';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import { Loader } from '@app/layout';
import { AuthenticatedRouteGuard } from '@app/router/guards';
import DashboardPage from './dashboard/DashboardPage';

const DashboardRoutes = React.lazy(
  () => import('@app/dashboard/DashboardRoutes')
);

export const App = () => {
  return (
    <BrowserRouter basename="/app">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="login" element={<LoginPage />} />

          <Route
            path="/*"
            element={
              <AuthenticatedRouteGuard>
                <DashboardPage>
                  <DashboardRoutes />
                </DashboardPage>
              </AuthenticatedRouteGuard>
            }
          />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
