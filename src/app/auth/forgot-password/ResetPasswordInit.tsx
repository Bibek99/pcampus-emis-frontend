import { Spinner } from '@app/components';
import { CustomTextInput } from '@app/components/Forms';
import { useResetPasswordSendEmail } from '@app/services';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const passwordResetEmailFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export const ResetPasswordInit = () => {
  const navigate = useNavigate();

  const [emailSent, setEmailSent] = useState<boolean>(false);

  const { mutate: sendEmail, isLoading } = useResetPasswordSendEmail({
    onError: () => {
      toast.error('Email not found');
    },
    onSuccess: () => {
      toast.success('Password reset token has been sent to your email');
      setEmailSent(true);
      setTimeout(() => {
        navigate('confirm');
      }, 3000);
    },
  });

  const passwordResetEmailForm = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: passwordResetEmailFormValidationSchema,
    onSubmit: (values) => {
      sendEmail(values);
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-emerald-100">
      <div className="flex max-w-lg flex-col space-y-6 rounded-lg bg-gray-50 p-6 shadow-sm md:p-12">
        {!emailSent ? (
          <>
            <div className="flex justify-center">
              <Image
                src={'/static/images/tu-logo.png'}
                width={64}
                height={64}
                alt="TU Logo"
              />
            </div>
            <h1 className="text-center text-xl font-semibold">
              Reset Password
            </h1>
            <form
              onSubmit={passwordResetEmailForm.handleSubmit}
              className="flex flex-col space-y-6"
            >
              <CustomTextInput
                name="email"
                label="Email"
                placeholder="Enter email to continue"
                onBlur={passwordResetEmailForm.handleBlur}
                onChange={passwordResetEmailForm.handleChange}
                error={passwordResetEmailForm.errors.email}
                required
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-emerald-500 py-3 font-semibold text-white"
              >
                <Spinner
                  className={isLoading ? 'mr-2 animate-spin' : 'hidden'}
                />
                <span>{isLoading ? 'Sending Email' : 'Continue'}</span>
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <Image src={'/static/images/email.png'} height={64} width={64} />
            </div>
            <p className="text-center">
              A token has been sent to {passwordResetEmailForm.values?.email}.
              Please wait while we redirect to the page where you setup your new
              password.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
