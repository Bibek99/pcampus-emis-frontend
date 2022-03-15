import Error404 from '@errors/Error404';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import { Loader } from '@app/layout';
import { RoleBasedDashboardWrapper } from './dashboard/RoleBasedDashboardWrapper';
import {
  ResetPasswordConfirm,
  ResetPasswordInit,
} from './auth/forgot-password';
import { UnAuthenticatedRouteGuard } from './router/guards/UnAuthenticatedRouteGuard';

export const App = () => {
  return (
    <BrowserRouter basename="/app">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="login"
            element={
              <UnAuthenticatedRouteGuard>
                <LoginPage />
              </UnAuthenticatedRouteGuard>
            }
          />

          <Route
            path="forgot-password/*"
            element={
              <Routes>
                <Route path="/" element={<ResetPasswordInit />} />
                <Route path="confirm" element={<ResetPasswordConfirm />} />
              </Routes>
            }
          />

          <Route path="/*" element={<RoleBasedDashboardWrapper />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
