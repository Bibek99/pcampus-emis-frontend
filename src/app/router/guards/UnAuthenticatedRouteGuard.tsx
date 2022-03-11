import { useAuthContext } from '@app/auth/AuthContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UnAuthenticatedRouteGuard: React.FC<{}> = ({ children }: any) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/dashboard`, {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? null : children;
};
