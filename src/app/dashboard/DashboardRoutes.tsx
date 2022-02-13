import Error404 from '@errors/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminRoutes } from './admin/AdminRoutes';
import { StudentRoutes } from './students/StudentRoutes';
import { TeacherRoutes } from './teachers/TeacherRoutes';

const DashboardRoutes = ({ role }: any) => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          role === 'ADMIN' ? (
            <AdminRoutes />
          ) : role === 'STUDENT' ? (
            <StudentRoutes />
          ) : (
            <h1>No role</h1>
          )
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoutes;
