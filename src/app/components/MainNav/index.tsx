import Image from 'next/image';
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { LogoutIcon } from '@app/elements/icons';
import { useAuthContext } from '@app/auth/AuthContext';
import { BellIcon } from '@heroicons/react/outline';

type MainNavProps = {
  isSidebarOpen?: boolean;
  setSidebarOpen: (isSidebarOpen: boolean) => void;
};

export const MainNav: React.FC<MainNavProps> = ({ setSidebarOpen }) => {
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
          <div className="flex items-center space-x-4">
            <BellIcon className="h-6 w-6" />
            <AvatarDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
};

const AvatarDropdown = () => {
  const { logout } = useAuthContext();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center px-4 py-2">
          <Image
            src="https://joeschmoe.io/api/v1/random"
            height={32}
            width={32}
            priority
          />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="group w-full rounded-md px-2 py-1 hover:bg-emerald-600 hover:text-white">
              <Menu.Item>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="flex items-center space-x-2"
                >
                  <LogoutIcon className="text-emerald-600 group-hover:fill-white" />
                  <span>Logout</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
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
