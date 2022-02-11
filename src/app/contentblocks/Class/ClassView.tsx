import {
  ClipboardCheckIcon,
  FolderIcon,
  InboxIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import React from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { AssignmentView, FeedView, MaterialView } from '.';

const ClassNav = () => {
  const { pathname } = useLocation();
  let active;
  if (pathname.includes('assignments')) active = 'assignments';
  else if (pathname.includes('materials')) active = 'materials';
  else active = 'feed';

  return (
    <section className="sticky top-0 flex w-full justify-center space-x-10 rounded-md bg-gray-50 p-4 shadow-sm">
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
  return (
    <>
      <ClassNav />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<FeedView />} />
          <Route path="assignments" element={<AssignmentView />} />
          <Route path="materials" element={<MaterialView />} />
        </Routes>
      </div>
    </>
  );
};
