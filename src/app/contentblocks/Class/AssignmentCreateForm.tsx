import {
  CustomDatePicker,
  CustomFileUpload,
  CustomTextInput,
} from '@app/components/Forms';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const assignmentCreateSchema = Yup.object().shape({});

export const AssignmentCreateForm = () => {
  const assignmentCreateForm = useFormik({
    initialValues: {
      title: '',
      description: '',
      points: '',
      due_date: '',
    },
    validationSchema: assignmentCreateSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="mx-auto flex w-full flex-col space-y-4 py-6">
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
            />
            <CustomFileUpload
              label="Upload Files"
              maxFiles={3}
              accept={['.png', '.pdf']}
            />
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <h3 className="text-lg font-semibold">Assignment Date/points</h3>
            <CustomTextInput
              label="Points"
              required
              name="points"
              type="number"
              placeholder="Enter the assignment points"
              onChange={assignmentCreateForm.handleChange}
              onBlur={assignmentCreateForm.handleBlur}
              error={assignmentCreateForm.errors?.points}
              touched={assignmentCreateForm.touched.points}
            />
            <CustomDatePicker
              name="due_date"
              placeholder="Due Date"
              required
              label="Due Date"
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
