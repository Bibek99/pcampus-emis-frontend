import Image from 'next/image';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLogin } from '@app/services/auth.service';
import { Spinner } from '@app/components';
import { toast } from 'react-toastify';
import { EyeCloseIcon, EyeOpenIcon } from '@app/elements/icons';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  remember: Yup.boolean(),
});

const LoginForm = ({ onLogin }: { onLogin?: () => void }) => {
  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useLogin({
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  if (isSuccess && onLogin) {
    onLogin();
  }

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      login({ email, password });
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex flex-auto flex-col justify-center">
      <div className="m-auto flex h-full max-w-sm flex-col items-center justify-center gap-8 py-8">
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
          className="flex w-full flex-col space-y-8"
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
            {loginForm.touched.email &&
            loginForm.errors.email &&
            loginForm.values.email ? (
              <span className="mt-1 text-sm italic text-red-500">
                {loginForm.errors.email}
              </span>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={!showPassword ? 'password' : 'text'}
                name="password"
                placeholder="Enter your password"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
                value={loginForm.values.password}
                className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                className="absolute right-4 top-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOpenIcon className="text-gray-400 hover:text-emerald-500" />
                ) : (
                  <EyeCloseIcon className="text-gray-400 hover:text-emerald-500" />
                )}
              </button>
            </div>
            {loginForm.touched.password &&
            loginForm.errors.password &&
            loginForm.values.password ? (
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
                className="form-checkbox h-4 w-4 rounded text-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 focus:ring-offset-0"
                onChange={loginForm.handleChange}
                onBlur={loginForm.handleBlur}
              />
              <label htmlFor="remember" className="ml-2">
                Remember Me
              </label>
            </div>
            <Link to="/forgot-password" className="text-emerald-500">
              Forgot Password ?
            </Link>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-emerald-500 py-3 font-semibold text-white"
          >
            <Spinner className={isLoading ? 'mr-2 animate-spin' : 'hidden'} />
            <span>{isLoading ? 'Signing In' : 'Sign in'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
