import {
  NoticeCreate,
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
import { Route, Routes } from 'react-router-dom';

export const DepartmentAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={<div className="rounded-md bg-gray-50 p-6">Dashboard</div>}
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
                path=":class/*"
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
