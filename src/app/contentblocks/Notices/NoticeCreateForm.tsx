import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomFileUpload, CustomTextInput } from '@app/components/Forms';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { useAuthContext } from '@app/auth/AuthContext';
import {
  useCreateDepartmentNotice,
  useCreateGlobalNotice,
} from '@app/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const noticeCreateSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Description is required'),
});

export const NoticeCreateForm: React.FC<{}> = () => {
  const { authenticatedUser, role, department } = useAuthContext();
  const userId = String(authenticatedUser?.id);

  const navigate = useNavigate();

  const { mutate: createGlobalNotice } = useCreateGlobalNotice({
    onError: () => {
      toast.error('Global Notice Create Error!');
    },
    onSuccess: () => {
      toast.success('Global Notice created successfully!');
      navigate('..');
    },
  });

  const { mutate: createDeptNotice } = useCreateDepartmentNotice({
    onError: () => {
      toast.error('Department Notice Create Error!');
    },
    onSuccess: () => {
      toast.success('Department Notice created successfully!');
      navigate('..');
    },
  });

  const noticeCreateForm = useFormik({
    initialValues: {
      title: '',
      content: '',
      files: '',
    },
    validationSchema: noticeCreateSchema,
    onSubmit: (values) => {
      console.log(values);
      const globalNotice = new FormData();
      globalNotice.append('title', values.title);
      globalNotice.append('content', values.content);
      globalNotice.append('publish_by', userId);
      globalNotice.append('files', values.files[0]);

      if (role === 'DEPT_ADMIN') {
        globalNotice.append('publish_to', department);
        createDeptNotice(globalNotice as any);
      } else {
        createGlobalNotice(globalNotice as any);
      }
    },
  });
  return (
    <div className="mx-auto flex w-full flex-col space-y-4 pb-6">
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
              name="content"
              placeholder="Enter the notice Description"
              onChange={noticeCreateForm.handleChange}
              onBlur={noticeCreateForm.handleBlur}
              error={noticeCreateForm.errors?.content}
              touched={noticeCreateForm.touched.content}
            />
            <CustomFileUpload
              label="Upload Files"
              name="files"
              maxFiles={1}
              accept={['.pdf']}
              setFieldValue={noticeCreateForm.setFieldValue}
              placeholder="Only PDF files are allowed"
            />
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <h3 className="text-lg font-semibold">Publish Domain</h3>
            {role === 'DEPT_ADMIN' ? (
              <p>For members of department</p>
            ) : (
              <p>All users for this EMIS system.</p>
            )}
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
