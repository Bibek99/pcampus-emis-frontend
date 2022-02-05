import {
  StudentsAddView,
  StudentsView,
  TeachersView,
} from '@app/contentblocks';
import Error404 from '@errors/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardRoutes: React.FC<{}> = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <div className="h-full rounded-md bg-gray-50 p-12">Dashboard</div>
        }
      />
      <Route
        path="notices"
        element={
          <div className="h-full  rounded-md bg-gray-50 p-12">Notices</div>
        }
      />
      <Route
        path="students/*"
        element={
          <div className="h-full rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<StudentsView />} />
              <Route path="/add" element={<StudentsAddView />} />
            </Routes>
          </div>
        }
      />
      <Route
        path="teachers/*"
        element={
          <div className="h-full rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<TeachersView />} />
              <Route path="/add" element={<div>Add Teachers</div>} />
            </Routes>
          </div>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default DashboardRoutes;
