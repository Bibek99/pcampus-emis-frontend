import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { CustomTextInput } from '@app/components/Forms';
import { useResetPasswordConfirm } from '@app/services';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const confirmPasswordResetSchema = Yup.object().shape({
  token: Yup.string().required('Token is required'),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ResetPasswordConfirm = () => {
  const navigate = useNavigate();

  const { mutate: confirmPasswordReset } = useResetPasswordConfirm({
    onError: () => {
      toast.error('Password reset error');
    },
    onSuccess: () => {
      toast.success('Password has been reset');
      navigate('/login');
    },
  });

  const confirmPasswordResetForm = useFormik({
    initialValues: {
      token: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: confirmPasswordResetSchema,
    onSubmit: (values) => {
      console.log(values);
      confirmPasswordReset(values);
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-100">
      <div className="flex max-w-lg flex-col space-y-6 rounded-lg bg-gray-50 p-6 shadow-sm md:p-12">
        <div className="flex justify-center">
          <Image
            src={'/static/images/tu-logo.png'}
            width={64}
            height={64}
            alt="TU Logo"
          />
        </div>
        <h1 className="text-center text-xl font-semibold">Reset Password</h1>
        <form
          onSubmit={confirmPasswordResetForm.handleSubmit}
          className="flex flex-col space-y-6"
        >
          <CustomTextInput
            name="token"
            label="Token"
            placeholder="Enter token from your email"
            onBlur={confirmPasswordResetForm.handleBlur}
            onChange={confirmPasswordResetForm.handleChange}
            error={confirmPasswordResetForm.errors.token}
            touched={confirmPasswordResetForm.touched.token}
            required
          />
          <div>
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={!showPassword ? 'password' : 'text'}
                name="password"
                placeholder="Enter your new password"
                onChange={confirmPasswordResetForm.handleChange}
                onBlur={confirmPasswordResetForm.handleBlur}
                value={confirmPasswordResetForm.values.password}
                className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                className="absolute right-4 top-5 h-6 w-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="text-gray-400 hover:text-emerald-500" />
                ) : (
                  <EyeIcon className="text-gray-400 hover:text-emerald-500" />
                )}
              </button>
            </div>
            {confirmPasswordResetForm.touched.password &&
            confirmPasswordResetForm.errors.password &&
            confirmPasswordResetForm.values.password ? (
              <span className="mt-1 text-sm italic text-red-500">
                {confirmPasswordResetForm.errors.password}
              </span>
            ) : null}
          </div>
          <div>
            <label htmlFor="password">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={!showConfirmPassword ? 'password' : 'text'}
                name="confirm_password"
                placeholder="Enter your new password again"
                onChange={confirmPasswordResetForm.handleChange}
                onBlur={confirmPasswordResetForm.handleBlur}
                value={confirmPasswordResetForm.values.confirm_password}
                className="mt-2 h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-6 py-2 focus:outline-none focus:ring-2"
              />
              <button
                type="button"
                className="absolute right-4 top-5 h-6 w-6"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="text-gray-400 hover:text-emerald-500" />
                ) : (
                  <EyeIcon className="text-gray-400 hover:text-emerald-500" />
                )}
              </button>
            </div>
            {confirmPasswordResetForm.touched.confirm_password &&
            confirmPasswordResetForm.errors.confirm_password &&
            confirmPasswordResetForm.values.confirm_password ? (
              <span className="mt-1 text-sm italic text-red-500">
                {confirmPasswordResetForm.errors.confirm_password}
              </span>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 p-2 text-white"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};
