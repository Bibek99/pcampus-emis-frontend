import Error404 from '@errors/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './admin/AdminRoutes';

const DashboardRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminRoutes />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoutes;
