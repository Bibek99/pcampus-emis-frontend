import { Page } from '@app/layout';
import { useRedirectFromurl } from '@app/router/useRedirectFromUrl';
import Head from 'next/head';
import React from 'react';
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

  const onLogin = () => {
    redirect();
  };
  return (
    <Page title="Login" description="Login to your account">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <LoginForm onSuccess={onLogin} />
        <LoginFooter />
      </div>
    </Page>
  );
};

export default LoginPage;
