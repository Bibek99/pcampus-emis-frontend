import { Modal } from '@app/layout';
import { CustomFileUpload } from '@app/components/Forms';
import { UploadIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { TeacherAddForm } from '.';
import { useCreateTeachersInBulk } from '@app/services';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const uploadTeacherSchema = Yup.object().shape({
  file: Yup.array().required('Please upload a file'),
});

export const TeachersAddView = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: createBulkTeachers, isLoading } = useCreateTeachersInBulk({
    onError: () => {
      toast.error('error');
    },
    onSuccess: () => {
      toast.success('created');
    },
  });

  const uploadTeacherForm = useFormik({
    initialValues: {
      file: '',
    },
    validationSchema: uploadTeacherSchema,
    onSubmit: (values) => {
      if (values.file[0]) {
        let formData = new FormData();
        formData.append('files', values.file[0]);
        formData.append('student', 'False');
        formData.append('staff', 'True');
        formData.append('admin', 'False');
        formData.append('department', 'False');

        createBulkTeachers(formData as any);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Add Teachers</h1>
          <button
            type="button"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
            onClick={() => setModalOpen(true)}
          >
            <span>
              <UploadIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Upload CSV File</span>
          </button>
        </div>
        <hr className="border border-gray-300" />
      </div>
      <Modal
        title="Upload CSV File"
        isLoading={isLoading}
        description={
          <form
            onSubmit={uploadTeacherForm.handleSubmit}
            className={isLoading ? 'pointer-events-none' : ''}
          >
            <span className="text-sm italic">
              For reference use the file below.
            </span>
            <a
              href="/static/files/export.csv"
              target="_blank"
              download
              className="ml-4 mb-6 text-sm text-blue-500 underline"
            >
              Example Teacher File
            </a>
            <CustomFileUpload
              name="file"
              accept={['.csv']}
              maxFiles={1}
              maxSize={5000 * 1024}
              setFieldValue={uploadTeacherForm.setFieldValue}
            />
            <hr />
            <div className="mt-6 flex items-center justify-center space-x-4">
              <button
                type="submit"
                className="rounded-md bg-emerald-500 py-2 px-4 text-white"
              >
                Upload
              </button>
              <button
                type="button"
                className="rounded-md border border-red-500 py-2 px-4 text-red-500"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        }
        isOpen={isModalOpen}
        setOpen={setModalOpen}
      />
      <TeacherAddForm />
    </>
  );
};
