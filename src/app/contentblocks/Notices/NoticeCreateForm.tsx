import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomFileUpload, CustomTextInput } from '@app/layout/Forms';
import { CustomTextArea } from '@app/layout/Forms/TextArea';

const noticeCreateSchema = Yup.object().shape({});

export const NoticeCreateForm: React.FC<{}> = () => {
  const noticeCreateForm = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: noticeCreateSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="mx-auto flex w-full flex-col space-y-4 py-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to create a Notice.
      </p>
      <form onSubmit={noticeCreateForm.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:divide-x-2">
          <section className="col-span-2 flex flex-col space-y-6 py-6">
            <h3 className="text-lg font-semibold">Notice Information</h3>
            <CustomTextInput
              label="Title"
              required
              name="title"
              placeholder="Enter the notice title"
              onChange={noticeCreateForm.handleChange}
              onBlur={noticeCreateForm.handleBlur}
              error={noticeCreateForm.errors?.title}
              touched={noticeCreateForm.touched.title}
            />
            <CustomTextArea
              label="Notice Description"
              required
              name="description"
              placeholder="Enter the notice Description"
              onChange={noticeCreateForm.handleChange}
              onBlur={noticeCreateForm.handleBlur}
              error={noticeCreateForm.errors?.description}
              touched={noticeCreateForm.touched.description}
            />
            <CustomFileUpload
              label="Upload Files"
              maxFiles={1}
              accept={['.png', '.pdf']}
            />
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <h3 className="text-lg font-semibold">Publish Domain</h3>
          </section>
        </div>
        <div className="mt-6 flex w-full justify-center">
          <button
            type="submit"
            className="w-full rounded-md bg-emerald-500 py-2 px-6 text-gray-50 sm:w-32"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
