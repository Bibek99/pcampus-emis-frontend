import { GreenSpinner } from '@app/components';
import {
  CustomDatePicker,
  CustomFileUpload,
  CustomTextInput,
} from '@app/components/Forms';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { useFetchAssignmentDetail, useUpdateAssignment } from '@app/services';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AssignmentEditView = () => {
  const { assignmentId } = useParams();

  const { assignmentData, isLoading } = useFetchAssignmentDetail(assignmentId);

  const { mutate: updateAssignment } = useUpdateAssignment(
    {
      onError: () => {
        toast.error('Something went wrong');
      },
      onSuccess: () => {
        toast.success('Assignment updated');
      },
    },
    assignmentId
  );

  const assignmentEditForm = useFormik({
    initialValues: {
      title: assignmentData?.title,
      description: assignmentData?.description,
      total_points: assignmentData?.total_points,
      due_date: assignmentData?.due_date,
      files: '',
    },
    onSubmit: (values) => {
      const updateAssignmentData = new FormData();
      updateAssignmentData.append('title', values.title);
      updateAssignmentData.append('description', values.description);
      updateAssignmentData.append('total_points', values.total_points);
      updateAssignmentData.append('due_date', values.due_date);
      updateAssignmentData.append('teacher_files', values.files[0]);

      updateAssignment(updateAssignmentData);
    },
  });

  if (isLoading) {
    <div className="flex h-full w-full items-center justify-center">
      <GreenSpinner className="h-12 w-12" />
    </div>;
  }

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 pb-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to create a Notice.
      </p>
      <form onSubmit={assignmentEditForm.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:divide-x-2">
          <section className="col-span-2 flex flex-col space-y-6 py-6">
            <h3 className="text-lg font-semibold">Assignment Information</h3>
            <CustomTextInput
              label="Title"
              required
              name="title"
              placeholder="Enter the assignment title"
              onChange={assignmentEditForm.handleChange}
              onBlur={assignmentEditForm.handleBlur}
              error={assignmentEditForm.errors?.title}
              //   touched={assignmentEditForm.touched.title}
              value={assignmentEditForm.values.title}
            />
            <CustomTextArea
              label="Description"
              required
              name="description"
              placeholder="Enter the assignment Description"
              onChange={assignmentEditForm.handleChange}
              onBlur={assignmentEditForm.handleBlur}
              error={assignmentEditForm.errors?.description}
              //   touched={assignmentEditForm.touched.description}
              value={assignmentEditForm.values.description}
            />
            <div>
              <CustomFileUpload
                label="Upload Files"
                name="files"
                maxFiles={1}
                accept={['.png', '.pdf']}
                setFieldValue={assignmentEditForm.setFieldValue}
                // placeholder="Uploading a file replaces the original file in the assignment. Leave this empty to not change the file."
              />
              <span className="text-xs italic text-red-500">
                Uploading a file replaces the original file in the assignment.
                Leave this empty to not change the file.
              </span>
            </div>
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <h3 className="text-lg font-semibold">Assignment Date/points</h3>
            <CustomTextInput
              label="Points"
              required
              name="total_points"
              type="number"
              placeholder="Enter the assignment points"
              onChange={assignmentEditForm.handleChange}
              onBlur={assignmentEditForm.handleBlur}
              error={assignmentEditForm.errors?.total_points}
              //   touched={assignmentEditForm.touched.total_points}
              value={assignmentEditForm.values.total_points}
            />
            <CustomDatePicker
              name="due_date"
              placeholder="Due Date"
              required
              label="Due Date"
              type="datetime-local"
              error={assignmentEditForm.errors?.due_date}
              //   touched={assignmentEditForm.touched.due_date}
              onChange={assignmentEditForm.handleChange}
              onBlur={assignmentEditForm.handleBlur}
              value={moment(assignmentEditForm.values.due_date).format(
                'YYYY-MM-DDTHH:mm'
              )}
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
