import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { SideBarMenuItem } from '.';
import { DashboardIcon } from '@app/elements/icons';
import { AdminRoutes } from '@app/elements/routes';

type SideBarType = {
  isSidebarOpen: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const SideBar: React.FC<SideBarType> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // Closing the navbar on clicking outside
  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !isSidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Closing the navbar on pressing the Escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!isSidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="lg:w-80">
      <div
        className={classNames(
          'fixed inset-0 z-40 bg-gray-50 bg-opacity-50 transition-opacity duration-200 lg:z-auto lg:hidden',
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
      />

      <aside
        id="sidebar"
        ref={sidebar}
        className={classNames(
          'no-scrollbar absolute left-0 top-0 z-40 h-screen w-80 flex-shrink-0 transform overflow-y-scroll bg-gray-100 p-6 transition-transform duration-200 ease-in-out lg:static lg:left-auto lg:translate-x-0 lg:overflow-y-auto',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-80'
        )}
      >
        <div className="mb-6 flex justify-end lg:hidden">
          <button
            ref={trigger}
            aria-controls="sidebar"
            aria-expanded={isSidebarOpen}
            onClick={() => setSidebarOpen(false)}
            className="hover:text-emerald-500"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col space-y-6">
          {AdminRoutes.map(
            (route, index) =>
              (<SideBarMenuItem key={index} route={route} />) as any
          )}
        </div>
      </aside>
    </div>
  );
};

export const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
