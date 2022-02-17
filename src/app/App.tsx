import Error404 from '@errors/Error404';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import { Loader } from '@app/layout';
import { RoleBasedDashboardWrapper } from './dashboard/RoleBasedDashboardWrapper';

export const App = () => {
  return (
    <BrowserRouter basename="/app">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="/*" element={<RoleBasedDashboardWrapper />} />

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
