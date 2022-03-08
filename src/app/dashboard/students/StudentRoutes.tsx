import React from 'react';
import { CalenderView } from '@app/contentblocks/Calender';
import { ClassList, ClassView } from '@app/contentblocks/Class';
import { Route, Routes } from 'react-router-dom';
import { NoticeDetailView, NoticeView } from '@app/contentblocks';

export const StudentRoutes = () => {
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
              <Route path=":noticeId" element={<NoticeDetailView />} />
            </Routes>
          </div>
        }
      />
      <Route
        path="classes/*"
        element={
          <div className="rounded-md bg-gray-50">
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
      <Route path="calendar" element={<CalenderView />} />
    </Routes>
  );
};
