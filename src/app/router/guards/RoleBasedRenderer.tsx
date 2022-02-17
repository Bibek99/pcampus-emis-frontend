import { useAuthContext } from '@app/auth/AuthContext';
import { ReactNode } from 'react';

export const RoleBasedRenderer = ({
  allowRoles,
  children,
}: {
  allowRoles: Array<string>;
  children: any;
}) => {
  const { role } = useAuthContext();
  if (allowRoles.includes(role)) {
    return children;
  }
  return <></>;
};
