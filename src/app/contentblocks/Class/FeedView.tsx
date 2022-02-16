import { useAuthContext } from '@app/auth/AuthContext';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { usecreateClassNotice } from '@app/services';
import { useFormik } from 'formik';
import Image from 'next/image';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FeedItem = () => {
  return (
    <div className="flex w-full space-x-4 pt-4">
      <div>Avatar</div>
      <div>Someone posted about the assignment.</div>
    </div>
  );
};

export const FeedCreate = () => {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();

  const userId = JSON.parse(authenticatedUser as any).id;

  const { mutate: createClassNotice } = usecreateClassNotice(
    {
      onError: () => {
        toast.error('error');
      },
      onSuccess: () => {
        toast.success('success');
        feedCreateForm.resetForm();
      },
    },
    id,
    userId
  );

  const feedCreateForm = useFormik({
    initialValues: {
      title: 'Notice',
      content: '',
      files: '',
    },
    onSubmit: (values) => {
      console.log(values);
      let newClassNotice = {
        ...values,
      };
      createClassNotice(newClassNotice);
    },
  });

  return (
    <div className="mb-8 flex space-x-6">
      <div className="rouned-full">
        <Image
          src="https://joeschmoe.io/api/v1/random"
          height={32}
          width={32}
          priority
        />
      </div>
      <form
        onSubmit={feedCreateForm.handleSubmit}
        className="flex w-full flex-col space-y-4 md:flex-row md:space-x-4"
      >
        <div className="flex-auto">
          <CustomTextArea
            label=""
            placeholder="Enter text"
            name="content"
            onChange={feedCreateForm.handleChange}
            onBlur={feedCreateForm.handleBlur}
            value={feedCreateForm.values.content}
          />
        </div>
        <button
          type="submit"
          className="h-10 w-20 rounded-md bg-emerald-500 px-6 py-2 text-white"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export const FeedView = () => {
  return (
    <>
      <FeedCreate />

      <div className="flex flex-col space-y-6 divide-y-2">
        {[1, 2, 3].map((feed, index) => (
          <FeedItem key={index} />
        ))}
      </div>
    </>
  );
};
