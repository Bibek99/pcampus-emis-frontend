import {
  DepartmentCreateView,
  DepartmentDetail,
  DepartmentView,
  NoticeCreate,
  NoticeDetailView,
  NoticeView,
  StudentsAddView,
  StudentsView,
  TeachersAddView,
  TeachersView,
} from '@app/contentblocks';
import { AdminDashboard } from '@app/contentblocks/Dashboard';
import {
  DepartmentUserAddView,
  DepartmentUsersView,
} from '@app/contentblocks/DepartmentUsers';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <div className="p-3">
            <AdminDashboard />
          </div>
        }
      />
      <Route
        path="notices/*"
        element={
          <div className="rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<NoticeView />} />
              <Route path="/create" element={<NoticeCreate />} />
              <Route path=":noticeId" element={<NoticeDetailView />} />
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
              <Route path="/:alias" element={<DepartmentDetail />} />
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
      <Route
        path="department-users/*"
        element={
          <div className="rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<DepartmentUsersView />} />
              <Route path="/add" element={<DepartmentUserAddView />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
};
