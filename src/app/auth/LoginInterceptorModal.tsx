import { CloseIcon } from '@app/elements/icons';
import api from '@app/services/api';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import LoginForm from './LoginForm';

export const LoginInterceptorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsAuthenticated, updateToken } = useAuthContext();
  const queryCache = useQueryClient();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnameRef = useRef('');
  pathnameRef.current = pathname;

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (r) => r,
      (error) => {
        if (
          error?.response?.status === 401 &&
          pathnameRef.current !== '/login'
        ) {
          queryCache.cancelQueries();
          setIsOpen(true);
        }
        throw error;
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [setIsOpen, updateToken, queryCache]);

  // Route change Watcher
  useEffect(() => {
    if (isOpen && pathname !== pathnameRef.current) {
      updateToken('');
      setIsOpen(false);
      setIsAuthenticated(false);
    }
  }, [isOpen, updateToken, setIsOpen, pathname]);

  const handleLogin = () => {
    queryCache.refetchQueries();
    setIsOpen(false);
  };

  const handleClose = () => {
    updateToken('');
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => handleClose()}
        className="fixed inset-0 z-20 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center">
          <Dialog.Overlay className="pointer-events-none fixed inset-0 bg-gray-800 opacity-10" />
          <div className="z-[1000] rounded-md bg-gray-50 px-12 py-6">
            <div className="flex justify-end">
              <button type="button" onClick={handleClose}>
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
