import { useAuthContext } from '@app/auth/AuthContext';
import { useFetchClass } from '@app/services';
import {
  ArrowLeftIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  DocumentReportIcon,
  FolderIcon,
  InboxIcon,
  PencilAltIcon,
  ServerIcon,
  TableIcon,
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

import { AttendanceRecord } from './Record';
import { AttendanceView } from './View';

const AttendanceClassNav = () => {
  const { pathname } = useLocation();
  let active;
  // if (pathname.includes('record')) active = 'record';
  if (pathname.includes('view')) active = 'view';
  else active = 'record';

  return (
    <section className="sticky -top-6 z-[50] flex w-full justify-center space-x-10 rounded-md bg-gray-50 p-4 shadow-sm ">
      <NavLink
        to="."
        className={classNames(
          'relative',
          active === 'record' ? 'text-emerald-500' : 'hover:text-emerald-500'
        )}
      >
        <div
          className={classNames(
            'flex space-x-2 text-center items-center',
            active === 'record'
              ? ' before:absolute before:-bottom-4 before:h-1  before:w-full before:rounded-t-md before:bg-emerald-500'
              : ''
          )}
        >
          <PencilAltIcon className="h-5 w-5" />
          <span className="hidden sm:block">Record</span>
        </div>
      </NavLink>
      <NavLink
        to="view"
        className={classNames(
          'relative',
          active === 'view'
            ? 'text-emerald-500'
            : 'hover:text-emerald-500'
        )}
      >
        <div
          className={classNames(
            'flex space-x-2 text-center items-center',
            active === 'view'
              ? ' before:absolute before:-bottom-4 before:h-1  before:w-full before:rounded-t-md before:bg-emerald-500'
              : ''
          )}
        >
          <DocumentReportIcon className="h-5 w-5" />
          <span className="hidden sm:block">View</span>
        </div>
      </NavLink>
    </section>
  );
};

export const AttendanceClassView = () => {
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
          onClick={() => navigate('/attendance')}
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
      <AttendanceClassNav />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<AttendanceRecord />} />
          <Route path="/view" element={<AttendanceView />} />
        </Routes>
      </div>
    </>
  );
};
