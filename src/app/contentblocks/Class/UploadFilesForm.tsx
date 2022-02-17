import { CustomFileUpload } from '@app/components/Forms';
import { useUploadMaterials } from '@app/services';
import classNames from 'classnames';
import { useFormik } from 'formik';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const uploadFilesSchema = Yup.object().shape({
  files: Yup.array().required('Files are required'),
});

export const UploadFilesForm = ({
  setOpen,
}: {
  setOpen: (arg: boolean) => void;
}) => {
  const { folderId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: uploadMaterials, isLoading } = useUploadMaterials(
    {
      onError: () => {
        toast.error('Error uploading materials');
      },
      onSuccess: () => {
        toast.success('Successfully uploaded materials');
        queryClient.invalidateQueries(['fetch-materials', folderId]);
        setOpen(false);
      },
    },
    folderId
  );

  const uploadFilesForm = useFormik({
    initialValues: {
      files: [],
    },
    validationSchema: uploadFilesSchema,
    onSubmit: (values) => {
      if (values?.files.length > 0) {
        const formData = new FormData();
        values.files?.map((file) => formData.append('files', file));
        uploadMaterials(formData as any);
      }
    },
  });

  return (
    <form
      className={classNames(
        'flex flex-col space-y-4',
        isLoading ? 'pointer-events-none' : ''
      )}
      onSubmit={uploadFilesForm.handleSubmit}
    >
      <p className="text-sm italic text-gray-700">
        Please select the files to upload. (Max number is 10)
      </p>
      <CustomFileUpload
        maxFiles={10}
        accept={['.jpg', '.jpeg', '.png', '.pdf']}
        name="files"
        setFieldValue={uploadFilesForm.setFieldValue}
      />
      <hr />
      <div className="mt-6 flex w-full justify-center space-x-4">
        <button
          type="submit"
          className="w-full rounded-md bg-emerald-500 py-2 px-6 text-gray-50 sm:w-32"
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full rounded-md border-2 border-red-500 bg-gray-50 py-2 px-6 text-red-500 sm:w-32"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
