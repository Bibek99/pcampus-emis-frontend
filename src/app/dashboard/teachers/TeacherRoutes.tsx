import {
  AssignmentCreateView,
  ClassList,
  ClassView,
} from '@app/contentblocks/Class';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const TeacherRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<div className="rounded-md bg-gray-50 p-12">Dashboard</div>}
      />
      <Route
        path="classes/*"
        element={
          <div className="rounded-md bg-gray-50">
            <Routes>
              <Route path="/" element={<ClassList />} />
              <Route
                path=":class/*"
                element={
                  <Routes>
                    <Route path="/*" element={<ClassView />} />
                  </Routes>
                }
              />
              <Route
                path=":class/assignments/create"
                element={<AssignmentCreateView />}
              />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
};
