import { Spinner } from '@app/components';
import { CustomTextInput } from '@app/components/Forms';
import { CustomTextArea } from '@app/components/Forms/TextArea';
import { useCreateDepartment } from '@app/services/user.service';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const departmentCreateSchema = Yup.object().shape({
  department_name: Yup.string().required('Department name is required'),
  description: Yup.string().required('Department description is required'),
  alias: Yup.string().required('Department alias is required'),
});

export const DepartmentCreateForm = () => {
  const navigate = useNavigate();
  const { mutate: createDepartment, isLoading } = useCreateDepartment({
    onError: () => {
      toast.error('Department Create Failed. Please Try again.');
    },
    onSuccess: () => {
      toast.success('Department added');
      departmentCreateForm.resetForm();
      navigate('..');
    },
  });

  const departmentCreateForm = useFormik({
    initialValues: {
      department_name: '',
      description: '',
      alias: '',
    },
    validationSchema: departmentCreateSchema,
    onSubmit: (values) => {
      console.log(values);
      const newDepartment = {
        ...values,
      };
      createDepartment(newDepartment);
    },
  });

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 pb-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to add a Department.
      </p>
      <form onSubmit={departmentCreateForm.handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <CustomTextInput
            label="Department Name"
            required
            name="department_name"
            placeholder="Enter the department name"
            onChange={departmentCreateForm.handleChange}
            onBlur={departmentCreateForm.handleBlur}
            error={departmentCreateForm.errors?.department_name}
            touched={departmentCreateForm.touched.department_name}
            value={departmentCreateForm.values.department_name}
          />
          <CustomTextInput
            label="Department Alias"
            required
            name="alias"
            placeholder="Enter the department alias"
            onChange={departmentCreateForm.handleChange}
            onBlur={departmentCreateForm.handleBlur}
            error={departmentCreateForm.errors?.alias}
            touched={departmentCreateForm.touched.alias}
            value={departmentCreateForm.values.alias}
          />
          <CustomTextArea
            label="Department Description"
            required
            name="description"
            placeholder="Enter the department description"
            onChange={departmentCreateForm.handleChange}
            onBlur={departmentCreateForm.handleBlur}
            error={departmentCreateForm.errors?.description}
            touched={departmentCreateForm.touched.description}
            value={departmentCreateForm.values.description}
          />
        </div>
        <div className="mt-6 flex w-full justify-center">
          <button
            type="submit"
            className="flex items-center justify-center rounded-lg bg-emerald-500 px-16 py-3 font-semibold text-white"
          >
            <Spinner className={isLoading ? 'mr-2 animate-spin' : 'hidden'} />
            <span>{isLoading ? 'Submitting Data' : 'Submit'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
