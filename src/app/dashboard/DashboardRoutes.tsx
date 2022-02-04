import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Error404 from '@errors/Error404';
import DashboardPage from '@app/dashboard/DashboardPage';

const DashboardRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoutes;
