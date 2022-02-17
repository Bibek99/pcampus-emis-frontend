import { useAuthContext } from '@app/auth/AuthContext';
import {
  ClipboardCheckIcon,
  FolderIcon,
  InboxIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import React from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AssignmentCreateView, AssignmentView } from './Assignment';
import { FeedView } from './Feed';
import { FolderDetailView, MaterialView } from './Materials';

const ClassNav = () => {
  const { pathname } = useLocation();
  let active;
  if (pathname.includes('assignments')) active = 'assignments';
  else if (pathname.includes('materials')) active = 'materials';
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
          <ClipboardCheckIcon className="h-5 w-5" />
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
    </section>
  );
};

export const ClassView = () => {
  const { role } = useAuthContext();
  return (
    <>
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
        </Routes>
      </div>
    </>
  );
};
