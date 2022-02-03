import Image from 'next/image';
import React from 'react';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm: React.FC<{}> = () => {
  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(loginForm.errors);

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center justify-center gap-8 py-8">
      <Image
        src={'/static/images/tu-logo.png'}
        width={64}
        height={64}
        alt="TU Logo"
      />
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-2xl font-semibold text-black dark:text-white">
          Login to Pulchowk Campus EMIS
        </h1>
        <p className="text-gray-700 dark:text-gray-200">
          Use your credentials to access your dashboard
        </p>
      </div>
      <form
        onSubmit={loginForm.handleSubmit}
        className="flex w-full flex-col gap-8"
      >
        <div>
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
            className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
          />
          {loginForm.touched.email && loginForm.errors.email ? (
            <span className="mt-1 text-sm italic text-red-500">
              {loginForm.errors.email}
            </span>
          ) : null}
        </div>
        <div>
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
            className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
          />
          {loginForm.touched.password && loginForm.errors.password ? (
            <span className="mt-1 text-sm italic text-red-500">
              {loginForm.errors.password}
            </span>
          ) : null}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row items-center">
            <input
              type="checkbox"
              name="remember"
              className="h-4 w-4 rounded text-emerald-500"
            />
            <label htmlFor="remember" className="ml-2">
              Remember Me
            </label>
          </div>
          <NextLink href="/forgot">
            <a className="text-emerald-500">Forgot Password ?</a>
          </NextLink>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-500 py-3 font-semibold text-white"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
