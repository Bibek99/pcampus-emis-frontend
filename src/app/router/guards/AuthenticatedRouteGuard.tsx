import { useAuthContext } from '@app/auth/AuthContext';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthenticatedRouteGuard: React.FC<{}> = ({ children }: any) => {
  const { isAuthenticated } = useAuthContext();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('checked auth');
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(pathname + search)}`, {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? null : children;
};
