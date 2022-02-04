import Error404 from '@errors/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Dashboard</h1>} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoutes;
