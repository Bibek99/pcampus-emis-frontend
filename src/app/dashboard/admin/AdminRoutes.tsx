import {
  DepartmentCreateView,
  DepartmentDetail,
  DepartmentView,
  NoticeCreate,
  NoticeView,
  StudentsAddView,
  StudentsView,
  TeachersAddView,
  TeachersView,
} from '@app/contentblocks';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<div className="rounded-md bg-gray-50 p-12">Dashboard</div>}
      />
      <Route
        path="notices/*"
        element={
          <div className="rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<NoticeView />} />
              <Route path="/create" element={<NoticeCreate />} />
            </Routes>
          </div>
        }
      />
      <Route
        path="departments/*"
        element={
          <div className="min-h-full rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<DepartmentView />} />
              <Route path="/create" element={<DepartmentCreateView />} />
              <Route path="/:id" element={<DepartmentDetail />} />
            </Routes>
          </div>
        }
      />
      <Route
        path="students/*"
        element={
          <div className="rounded-md bg-gray-50 p-6">
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
          <div className="rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<TeachersView />} />
              <Route path="/add" element={<TeachersAddView />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
};
