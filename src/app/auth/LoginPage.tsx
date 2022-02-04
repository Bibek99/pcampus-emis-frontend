import { useRedirectFromurl } from '@app/router/useRedirectFromUrl';
import Head from 'next/head';
import React from 'react';
import LoginForm from './LoginForm';

const LoginPage: React.FC<{}> = () => {
  const redirect = useRedirectFromurl();

  const onLogin = () => {
    redirect();
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm onSuccess={onLogin} />;
    </>
  );
};

export default LoginPage;
