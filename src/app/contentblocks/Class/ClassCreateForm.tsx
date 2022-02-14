import { CustomTextInput } from '@app/components/Forms';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import Select from 'react-select';
import { CustomMultiSelectInput } from '@app/components/Forms/MultiSelect';

const classCreateSchema = Yup.object().shape({
  teachers: Yup.array().required('Please select at least a teacher'),
});

export const ClassCreateForm = () => {
  const classCreateForm = useFormik({
    initialValues: {
      class_name: '',
      alias: '',
      description: '',
      teachers: '',
    },
    validationSchema: classCreateSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="mx-auto flex w-full flex-col space-y-4 pb-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to create a class.
      </p>
      <form onSubmit={classCreateForm.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 xl:divide-x-2">
          <section className="col-span-2 flex flex-col space-y-6 py-6">
            <h3 className="text-lg font-semibold">Class Information</h3>
            <CustomTextInput
              label="Name"
              required
              name="class_name"
              placeholder="Enter the class name"
              onChange={classCreateForm.handleChange}
              onBlur={classCreateForm.handleBlur}
              error={classCreateForm.errors?.class_name}
              touched={classCreateForm.touched.class_name}
            />
            <CustomTextInput
              label="Alias"
              required
              name="alias"
              placeholder="Enter the class alias code"
              onChange={classCreateForm.handleChange}
              onBlur={classCreateForm.handleBlur}
              error={classCreateForm.errors?.alias}
              touched={classCreateForm.touched.alias}
            />
            <CustomTextArea
              label="Description"
              required
              name="description"
              placeholder="Enter the class description"
              onChange={classCreateForm.handleChange}
              onBlur={classCreateForm.handleBlur}
              error={classCreateForm.errors?.description}
              touched={classCreateForm.touched.description}
            />
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <h3 className="text-lg font-semibold">
              Teachers & Students Information
            </h3>
            <CustomMultiSelectInput
              label="Teachers"
              placeholder="Select Teacher(s)"
              required
              options={[
                { value: 'teacher1@email.com', label: 'teacher1@email.com' },
                { value: 'teacher2@email.com', label: 'teacher2@email.com' },
                { value: 'teacher3@email.com', label: 'teacher3@email.com' },
                { value: 'teacher4@email.com', label: 'teacher4@email.com' },
                { value: 'teacher5@email.com', label: 'teacher5@email.com' },
                { value: 'teacher6@email.com', label: 'teacher6@email.com' },
              ]}
              name="teachers"
              onChange={(option: any) => {
                classCreateForm.getFieldHelpers('teachers').setValue(option);
              }}
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
