import { useAuthContext } from '@app/auth/AuthContext';
import { useFetchClass } from '@app/services';
import {
  ArrowLeftIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  FolderIcon,
  InboxIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import React from 'react';
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  AssignmentCreateView,
  AssignmentEditView,
  AssignmentSubmissionsListView,
  AssignmentSubmitView,
  AssignmentView,
} from './Assignment';
import { FeedView } from './Feed';
import { GradesListView } from './Grades';
import { FolderDetailView, MaterialView } from './Materials';

const ClassNav = () => {
  const { pathname } = useLocation();
  let active;
  if (pathname.includes('assignments')) active = 'assignments';
  else if (pathname.includes('materials')) active = 'materials';
  else if (pathname.includes('grades')) active = 'grades';
  else active = 'feed';

  return (
    <section className="sticky -top-6 z-[50] flex w-full justify-center space-x-10 rounded-md bg-gray-50 p-4 shadow-sm ">
      <NavLink
        to="."
        className={classNames(
          'relative',
          active === 'feed' ? 'text-emerald-500' : 'hover:text-emerald-500'
        )}
      >
        <div
          className={classNames(
            'flex space-x-2 text-center',
            active === 'feed'
              ? ' before:absolute before:-bottom-4 before:h-1  before:w-full before:rounded-t-md before:bg-emerald-500'
              : ''
          )}
        >
          <InboxIcon className="h-5 w-5" />
          <span className="hidden sm:block">Feed</span>
        </div>
      </NavLink>
      <NavLink
        to="assignments"
        className={classNames(
          'relative',
          active === 'assignments'
            ? 'text-emerald-500'
            : 'hover:text-emerald-500'
        )}
      >
        <div
          className={classNames(
            'flex space-x-2 text-center',
            active === 'assignments'
              ? ' before:absolute before:-bottom-4 before:h-1  before:w-full before:rounded-t-md before:bg-emerald-500'
              : ''
          )}
        >
          <ClipboardListIcon className="h-5 w-5" />
          <span className="hidden sm:block">Assignments</span>
        </div>
      </NavLink>
      <NavLink
        to="materials"
        className={classNames(
          'relative',
          active === 'materials' ? 'text-emerald-500' : 'hover:text-emerald-500'
        )}
      >
        <div
          className={classNames(
            'flex space-x-2 text-center',
            active === 'materials'
              ? ' before:absolute before:-bottom-4 before:h-1  before:w-full before:rounded-t-md before:bg-emerald-500'
              : ''
          )}
        >
          <FolderIcon className="h-5 w-5" />
          <span className="hidden sm:block">Materials</span>
        </div>
      </NavLink>
      {/* <NavLink
        to="grades"
        className={classNames(
          'relative',
          active === 'grades' ? 'text-emerald-500' : 'hover:text-emerald-500'
        )}
      >
        <div
          className={classNames(
            'flex space-x-2 text-center',
            active === 'grades'
              ? ' before:absolute before:-bottom-4 before:h-1  before:w-full before:rounded-t-md before:bg-emerald-500'
              : ''
          )}
        >
          <ClipboardCheckIcon className="h-5 w-5" />
          <span className="hidden sm:block">Grades</span>
        </div>
      </NavLink> */}
    </section>
  );
};

export const ClassView = () => {
  const { role } = useAuthContext();
  const navigate = useNavigate();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { classData } = useFetchClass(role, userId);

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 px-6 py-4">
        <button
          type="button"
          className="flex items-center justify-center space-x-2"
          onClick={() => navigate('/classes')}
        >
          <span>
            <ArrowLeftIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Back</span>
        </button>
        <h2 className="text-xl font-semibold">
          {classData && classData[0]?.name}
        </h2>
        <span className="w-4"></span>
      </div>
      <ClassNav />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<FeedView />} />
          <Route
            path="assignments/*"
            element={
              <Routes>
                <Route path="/" element={<AssignmentView />} />
                {role === 'TEACHER' && (
                  <Route path="create" element={<AssignmentCreateView />} />
                )}
                {role === 'STUDENT' && (
                  <Route
                    path=":assignmentId/"
                    element={<AssignmentSubmitView />}
                  />
                )}
                {role === 'TEACHER' && (
                  <>
                    <Route
                      path=":assignmentId/"
                      element={<AssignmentSubmissionsListView />}
                    />
                    <Route
                      path=":assignmentId/edit"
                      element={<AssignmentEditView />}
                    />
                  </>
                )}
              </Routes>
            }
          />
          <Route
            path="materials/*"
            element={
              <Routes>
                <Route path="/" element={<MaterialView />} />
                <Route path=":folderId" element={<FolderDetailView />} />
              </Routes>
            }
          />
          {/* <Route path="grades" element={<GradesListView />} /> */}
        </Routes>
      </div>
    </>
  );
};
