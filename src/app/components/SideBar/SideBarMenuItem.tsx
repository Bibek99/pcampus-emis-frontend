import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type SideBarMenuItem = {
  title: string;
  icon?: ReactNode | string;
  path: string;
};

type SideBarMenuProp = {
  route: SideBarMenuItem;
  onClick?: () => void;
};

export const SideBarMenuItem: React.FC<SideBarMenuProp> = ({
  route,
  ...rest
}) => {
  return (
    <NavLink
      {...rest}
      to={route.path}
      className={({ isActive }) =>
        'flex justify-start space-x-4 rounded-sm py-2 px-6 text-center ' +
        (isActive
          ? 'border-l-4 border-emerald-600 bg-emerald-100/30 text-emerald-600'
          : 'hover:text-emerald-600')
      }
    >
      {route.icon}
      <span>{route.title}</span>
    </NavLink>
  );
};
