import Image from 'next/image';
import React from 'react';

type MainNavProps = {
  isSidebarOpen?: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const MainNav: React.FC<MainNavProps> = ({
  isSidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <nav className="sticky top-0 z-10 border-gray-500 bg-gray-100">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="hover:text-emerald-500 lg:hidden"
            aria-controls="sidebar"
          >
            <MenuIcon />
          </button>
          <div className="flex items-center space-x-4">
            <Image
              src={'/static/images/tu-logo.png'}
              width={32}
              height={32}
              priority
            />
            <span className="font-medium md:text-lg">Pulchowk Campus</span>
          </div>
          <span>Right</span>
        </div>
      </div>
    </nav>
  );
};

export const MenuIcon = () => (
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
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>
);
