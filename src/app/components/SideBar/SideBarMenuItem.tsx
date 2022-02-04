import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SideBarMenuItem = {
  title: string;
  icon?: ReactNode | string;
  path: string;
};

type SideBarMenuProp = {
  route: SideBarMenuItem;
};

export const SideBarMenuItem: React.FC<SideBarMenuProp> = ({ route }) => {
  return (
    <NavLink
      to={route.path}
      className={({ isActive }) =>
        'flex justify-start space-x-4 rounded-sm py-2 px-6 text-center ' +
        (isActive
          ? 'border-l-4 border-emerald-600 bg-emerald-200/50 text-emerald-600'
          : 'hover:text-emerald-600')
      }
    >
      {route.icon}
      <span>{route.title}</span>
    </NavLink>
  );
};
