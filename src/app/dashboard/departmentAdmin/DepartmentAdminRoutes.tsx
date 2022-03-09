import {
  DeptNoticeDetailView,
  NoticeCreate,
  NoticeDetailView,
  NoticesWrapper,
  NoticeView,
  StudentsAddView,
  StudentsView,
  TeachersAddView,
  TeachersView,
} from '@app/contentblocks';
import {
  ClassCreateView,
  ClassList,
  ClassView,
} from '@app/contentblocks/Class';
import { DeptAdminDashboard } from '@app/contentblocks/Dashboard/DeptAdminDashboard';
import { Route, Routes } from 'react-router-dom';

export const DepartmentAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <div className="p-3">
            <DeptAdminDashboard />
          </div>
        }
      />
      <Route
        path="notices/*"
        element={
          <div className="rounded-md bg-gray-50 p-6">
            <Routes>
              <Route path="/" element={<NoticesWrapper />} />
              <Route path="/create" element={<NoticeCreate />} />
              <Route path=":noticeId" element={<NoticeDetailView />} />
              <Route path="dept/:noticeId" element={<DeptNoticeDetailView />} />
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
        path="classes/*"
        element={
          <div className="rounded-md bg-gray-50">
            <Routes>
              <Route path="/" element={<ClassList />} />
              <Route path="create" element={<ClassCreateView />} />
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
    </Routes>
  );
};
