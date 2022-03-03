import { CustomSelectInput, CustomTextInput } from '@app/components/Forms';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { CustomMultiSelectInput } from '@app/components/Forms/MultiSelect';
import {
  useFetchBatch,
  useFetchSection,
  useFilterTeacher,
} from '@app/services/user.service';
import { useAuthContext } from '@app/auth/AuthContext';
import { toast } from 'react-toastify';
import { useCreateClass } from '@app/services';

const classCreateSchema = Yup.object().shape({
  teachers: Yup.array().required('Please select at least a teacher'),
});

export const ClassCreateForm = () => {
  const { data } = useFilterTeacher();
  const { data: batches } = useFetchBatch();
  const { data: sections } = useFetchSection();
  const { department: deptContext } = useAuthContext();
  const { mutate: createClass } = useCreateClass({
    onError: () => {
      toast.error('error');
    },
    onSuccess: () => {
      toast.success('success');
    },
  });

  let optionsList: any[] = [];
  const getOptions = () => {
    if (data?.data) {
      return data.data.map((item: any, index: number) => {
        optionsList[index] = {
          label: `${item.teacher.first_name} ${item.teacher.middle_name} ${item.teacher.last_name}`,
          value: item.teacher.id,
        };
      });
    }
  };

  const classCreateForm = useFormik({
    initialValues: {
      class_name: '',
      alias: '',
      teachers: [],
      department: '',
      batch: '',
      section: '',
    },
    validationSchema: classCreateSchema,
    onSubmit: (values) => {
      const { teachers, department, ...rest } = values;
      const t_id = teachers.map((item: any) => item.value);
      const newClass = {
        ...rest,
        department: deptContext,
        t_id,
      };
      createClass(newClass);
    },
  });

  getOptions();
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
            {/* <CustomTextArea
              label="Description"
              required
              name="description"
              placeholder="Enter the class description"
              onChange={classCreateForm.handleChange}
              onBlur={classCreateForm.handleBlur}
              error={classCreateForm.errors?.description}
              touched={classCreateForm.touched.description}
            /> */}
          </section>
          <section className="flex flex-col space-y-6 py-6 xl:pl-4">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Teachers Information</h3>
              <CustomMultiSelectInput
                label="Teachers"
                placeholder="Select Teacher(s)"
                required
                options={optionsList}
                name="teachers"
                onChange={(option: any) => {
                  classCreateForm.getFieldHelpers('teachers').setValue(option);
                }}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Students Information</h3>
              <CustomSelectInput
                required
                label="Batch"
                placeholder="Select Batch"
                name="batch"
                onChange={classCreateForm.handleChange}
                onBlur={classCreateForm.handleBlur}
                error={classCreateForm.errors?.batch}
                options={batches?.data}
              />
              <CustomSelectInput
                required
                label="Section"
                placeholder="Select Section"
                name="section"
                onBlur={classCreateForm.handleBlur}
                onChange={classCreateForm.handleChange}
                error={classCreateForm.errors?.section}
                options={sections?.data}
              />
            </div>
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
