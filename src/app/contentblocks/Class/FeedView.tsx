import { useAuthContext } from '@app/auth/AuthContext';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { usecreateClassNotice, useFetchClassNotice } from '@app/services';
import { useFormik } from 'formik';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

export const FeedItem = ({ feed }: { feed: any }) => {
  return (
    <div className="flex w-full space-x-4 pt-4">
      <div>
        <Image
          src="https://joeschmoe.io/api/v1/random"
          height={32}
          width={32}
          priority
        />
      </div>
      <div className="space-y-2">
        <h3>
          {feed.title === 'Notice' ? (
            <>
              <span className="font-semibold">{feed.publish_by}</span>
              <span className="ml-2 rounded-full bg-green-100 py-1 px-2 text-sm capitalize text-green-700">
                Notice
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold">{feed.publish_by}</span>
              <span className="ml-2 rounded-full bg-red-100 py-1 px-2 text-sm capitalize text-red-700">
                Assignment
              </span>
            </>
          )}
        </h3>
        {feed.title !== 'Notice' ? (
          <p className="text-gray-800">{feed.title}</p>
        ) : (
          <p className="text-gray-800">{feed?.content}</p>
        )}
        <span className="text-sm italic text-gray-500">
          {moment(feed?.created_at).fromNow()}
        </span>
      </div>
    </div>
  );
};

const classNoticeSchema = Yup.object().shape({
  content: Yup.string().required('Content is required'),
});

export const FeedCreate = () => {
  const queryClient = useQueryClient();

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
        queryClient.invalidateQueries(['classNotice', id]);
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
    validationSchema: classNoticeSchema,
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
  const { id } = useParams();

  const { data: feeds } = useFetchClassNotice(
    {
      onError: () => {
        toast.error('Notice fetch error');
      },
      onSuccess: () => {
        toast.success('Notice fetch success');
      },
    },
    id
  );

  return (
    <>
      <FeedCreate />

      <div className="flex flex-col space-y-6 divide-y-2">
        {feeds?.data.map((feed: any, index: number) => (
          <FeedItem feed={feed} key={index} />
        ))}
      </div>
    </>
  );
};
