import { useAuthContext } from '@app/auth/AuthContext';
import {
  CustomDatePicker,
  CustomFileUpload,
  CustomTextInput,
} from '@app/components/Forms';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { useCreateAssignment } from '@app/services';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const assignmentCreateSchema = Yup.object().shape({});

export const AssignmentCreateForm = () => {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);

  const navigate = useNavigate();

  const { mutate: createAssignment } = useCreateAssignment(
    {
      onError: () => {
        toast.error('Assignment create Error!');
      },
      onSuccess: () => {
        toast.success('Assignment created successfully!');
        assignmentCreateForm.resetForm();
        navigate('../');
      },
    },
    id,
    userId
  );

  const assignmentCreateForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      total_points: '',
      due_date: '',
      files: '',
    },
    validationSchema: assignmentCreateSchema,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append('teacher_files', values.files[0]);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('total_points', values.total_points);
      formData.append('due_date', values.due_date);

      createAssignment(formData as any);
    },
  });

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 pb-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to create a Notice.
      </p>
      <form onSubmit={assignmentCreateForm.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:divide-x-2">
          <section className="col-span-2 flex flex-col space-y-6 py-6">
            <h3 className="text-lg font-semibold">Assignment Information</h3>
            <CustomTextInput
              label="Title"
              required
              name="title"
              placeholder="Enter the assignment title"
              onChange={assignmentCreateForm.handleChange}
              onBlur={assignmentCreateForm.handleBlur}
              error={assignmentCreateForm.errors?.title}
              touched={assignmentCreateForm.touched.title}
              value={assignmentCreateForm.values.title}
            />
            <CustomTextArea
              label="Description"
              required
              name="description"
              placeholder="Enter the assignment Description"
              onChange={assignmentCreateForm.handleChange}
              onBlur={assignmentCreateForm.handleBlur}
              error={assignmentCreateForm.errors?.description}
              touched={assignmentCreateForm.touched.description}
              value={assignmentCreateForm.values.description}
            />
            <CustomFileUpload
              label="Upload Files"
              name="files"
              maxFiles={1}
              accept={['.png', '.pdf']}
              setFieldValue={assignmentCreateForm.setFieldValue}
            />
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <h3 className="text-lg font-semibold">Assignment Date/points</h3>
            <CustomTextInput
              label="Points"
              required
              name="total_points"
              type="number"
              placeholder="Enter the assignment points"
              onChange={assignmentCreateForm.handleChange}
              onBlur={assignmentCreateForm.handleBlur}
              error={assignmentCreateForm.errors?.total_points}
              touched={assignmentCreateForm.touched.total_points}
              value={assignmentCreateForm.values.total_points}
            />
            <CustomDatePicker
              name="due_date"
              placeholder="Due Date"
              required
              label="Due Date"
              type="datetime-local"
              error={assignmentCreateForm.errors?.due_date}
              touched={assignmentCreateForm.touched.due_date}
              onChange={assignmentCreateForm.handleChange}
              onBlur={assignmentCreateForm.handleBlur}
              value={assignmentCreateForm.values.due_date}
            />
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
