import { Page } from '@app/layout';
import { useRedirectFromurl } from '@app/router/useRedirectFromUrl';
import React, { useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import LoginForm from './LoginForm';

const LoginFooter: React.FC<{}> = () => {
  return (
    <footer className="w-full justify-self-end py-4 text-center text-gray-700">
      Copyright &copy; 2022 produced by Pulchowk Campus EMIS.
    </footer>
  );
};

const LoginPage: React.FC<{}> = () => {
  const redirect = useRedirectFromurl();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      redirect();
    }
  }, [isAuthenticated, redirect]);

  return (
    <Page title="Login" description="Login to your account">
      <div className="flex min-h-screen flex-col items-center p-4">
        <LoginForm />
        <LoginFooter />
      </div>
    </Page>
  );
};

export default LoginPage;
