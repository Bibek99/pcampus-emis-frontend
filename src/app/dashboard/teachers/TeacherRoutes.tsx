import {
  DeptNoticeDetailView,
  NoticeDetailView,
  NoticesWrapper,
  NoticeView,
} from '@app/contentblocks';
import { CalenderView } from '@app/contentblocks/Calender';
import { ClassView, ClassList } from '@app/contentblocks/Class';
import { AttendanceClassView, AttendanceClassList } from '@app/contentblocks/Attendance';
import { TeacherDashboard } from '@app/contentblocks/Dashboard/TeacherDashboard';
import { StudentPerformanceByClass } from '@app/contentblocks/Performance';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const TeacherRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <div className="p-3">
            <TeacherDashboard />
          </div>
        }
      />
      <Route
        path="notices/*"
        element={
          <div className="rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<NoticesWrapper />} />
              <Route path=":noticeId" element={<NoticeDetailView />} />
              <Route path="dept/:noticeId" element={<DeptNoticeDetailView />} />
            </Routes>
          </div>
        }
      />
      <Route
        path="classes/*"
        element={
          <div className="min-h-full rounded-md bg-gray-50">
            <Routes>
              <Route path="/" element={<ClassList />} />
              <Route
                path=":class-:id/*"
                element={
                  <Routes>
                    <Route path="/*" element={<ClassView />} />
                  </Routes>
                }
              />
            </Routes>
          </div>
        }
      />
      <Route
        path="performance"
        element={
          <div className="min-h-full rounded-md bg-gray-50">
            <StudentPerformanceByClass />
          </div>
        }
      />
      <Route path="calendar" element={<CalenderView />} />
      <Route
        path="attendance/*"
        element={
          <div className="rounded-md bg-gray-50">
            <Routes>
              <Route path="/" element={<AttendanceClassList />} />
              <Route
                path=":class-:id/*"
                element={
                  <Routes>
                    <Route path="/*" element={<AttendanceClassView />} />
                  </Routes>
                }
              />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
};
