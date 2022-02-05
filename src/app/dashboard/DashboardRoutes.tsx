import Error404 from '@errors/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      {/* <Route path="/*" element={<DashboardPage />} />
       */}

      <Route
        path="dashboard"
        element={<div className="bg-gray-50 p-12">Ram</div>}
      />
      <Route
        path="notices"
        element={<div className="bg-gray-50 p-12">Notices</div>}
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoutes;
