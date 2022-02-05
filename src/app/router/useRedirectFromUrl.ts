import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useRedirectFromurl = (defaultTo = '/dashboard') => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return useCallback(
    () =>
      navigate(
        searchParams.get('redirect')
          ? decodeURIComponent(searchParams.get('redirect') || '')
          : defaultTo,
        {
          replace: true,
        }
      ),
    [navigate, searchParams, defaultTo]
  );
};
