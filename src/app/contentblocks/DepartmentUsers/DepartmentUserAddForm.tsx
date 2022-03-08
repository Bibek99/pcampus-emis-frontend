import { Spinner } from '@app/components';
import {
  CustomDatePicker,
  CustomSelectInput,
  CustomTextInput,
} from '@app/components/Forms';
import {
  useCreateDepartmentAdminAccount,
  useFetchDepartment,
} from '@app/services';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const departmentUserAddSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is requied'),
  last_name: Yup.string().required('Last Name is requied'),
  gender: Yup.string().required('Please select a gender'),
  email: Yup.string()
    .email('Please provide a valid email')
    .required('Email is required'),
  department_name: Yup.string().required('Department is required'),
});

export const DepartmentUserAddForm = () => {
  const navigate = useNavigate();

  const { mutate: createDepartmentAdmin, isLoading } =
    useCreateDepartmentAdminAccount({
      onError: () => {
        toast.error('Error');
      },
      onSuccess: () => {
        toast.success('Success');
        navigate('..');
      },
    });

  const departmentUserForm = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      department_name: '',
    },
    validationSchema: departmentUserAddSchema,
    onSubmit: (values) => {
      console.log(values);
      const newDepartmentAdmin = {
        ...values,
      };
      createDepartmentAdmin(newDepartmentAdmin);
    },
  });

  const { data: departments } = useFetchDepartment();
  return (
    <div className="mx-auto flex w-full flex-col space-y-4">
      <p className="text-sm italic text-gray-600">
        Fill the form below to add an individual department admin to EMIS.
      </p>
      <form onSubmit={departmentUserForm.handleSubmit}>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomTextInput
              name="first_name"
              placeholder="Enter first name"
              required
              label="First Name"
              error={departmentUserForm.errors?.first_name}
              touched={departmentUserForm.touched.first_name}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.first_name}
            />
            <CustomTextInput
              name="middle_name"
              placeholder="Enter middle name"
              label="Middle Name"
              error={departmentUserForm.errors?.middle_name}
              touched={departmentUserForm.touched.middle_name}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.middle_name}
            />
            <CustomTextInput
              name="last_name"
              placeholder="Enter last name"
              required
              label="Last Name"
              error={departmentUserForm.errors?.last_name}
              touched={departmentUserForm.touched.last_name}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.last_name}
            />
            <CustomSelectInput
              name="gender"
              placeholder="Select gender"
              required
              label="Gender"
              error={departmentUserForm.errors?.gender}
              touched={departmentUserForm.touched.gender}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              options={[
                {
                  id: 1,
                  name: 'Male',
                },
                {
                  id: 2,
                  name: 'Female',
                },
              ]}
            />
            <CustomDatePicker
              name="dob"
              placeholder="Date of birth"
              label="Date of birth"
              error={departmentUserForm.errors?.dob}
              touched={departmentUserForm.touched.dob}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.dob}
            />
          </div>
        </section>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomTextInput
              name="email"
              placeholder="Enter email address"
              required
              label="Email"
              error={departmentUserForm.errors?.email}
              touched={departmentUserForm.touched.email}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.email}
            />
            <CustomTextInput
              name="phone"
              placeholder="Enter phone number"
              label="Phone"
              error={departmentUserForm.errors?.phone}
              touched={departmentUserForm.touched.phone}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.phone}
            />
          </div>
        </section>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Address Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomTextInput
              name="address"
              placeholder="Enter Address"
              label="Address"
              error={departmentUserForm.errors?.address}
              touched={departmentUserForm.touched.address}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              value={departmentUserForm.values.address}
            />
          </div>
        </section>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Academic Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomSelectInput
              name="department_name"
              placeholder="Select Department"
              required
              label="Department"
              error={departmentUserForm.errors?.department_name}
              touched={departmentUserForm.touched.department_name}
              onChange={departmentUserForm.handleChange}
              onBlur={departmentUserForm.handleBlur}
              options={departments?.data}
            />
          </div>
        </section>
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
