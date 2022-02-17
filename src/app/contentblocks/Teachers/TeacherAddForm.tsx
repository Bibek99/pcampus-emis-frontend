import React from 'react';
import { useFormik } from 'formik';
import {
  CustomDatePicker,
  CustomSelectInput,
  CustomTextInput,
} from '@app/components/Forms';
import * as Yup from 'yup';
import {
  useCreateTeacherAccount,
  useFetchDepartment,
} from '@app/services/user.service';
import { toast } from 'react-toastify';
import { Spinner } from '@app/components';

const teacherAddSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is requied'),
  last_name: Yup.string().required('Last Name is requied'),
  gender: Yup.string().required('Please select a gender'),
  email: Yup.string()
    .email('Please provide a valid email')
    .required('Email is required'),
  department_name: Yup.string().required('Department is required'),
});

export const TeacherAddForm: React.FC<{}> = () => {
  const { mutate: createTeacher, isLoading } = useCreateTeacherAccount({
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Teacher Added To Database');
      teacherAddForm.resetForm();
    },
  });
  const teacherAddForm = useFormik({
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
    validationSchema: teacherAddSchema,
    onSubmit: (values) => {
      const newTeacher = {
        ...values,
      };
      createTeacher(newTeacher);
    },
  });

  const { data: departments } = useFetchDepartment();
  return (
    <div className="mx-auto flex w-full flex-col space-y-4 py-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to add an individual teacher to EMIS.
      </p>
      <form onSubmit={teacherAddForm.handleSubmit}>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomTextInput
              name="first_name"
              placeholder="Enter first name"
              required
              label="First Name"
              error={teacherAddForm.errors?.first_name}
              touched={teacherAddForm.touched.first_name}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.first_name}
            />
            <CustomTextInput
              name="middle_name"
              placeholder="Enter middle name"
              label="Middle Name"
              error={teacherAddForm.errors?.middle_name}
              touched={teacherAddForm.touched.middle_name}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.middle_name}
            />
            <CustomTextInput
              name="last_name"
              placeholder="Enter last name"
              required
              label="Last Name"
              error={teacherAddForm.errors?.last_name}
              touched={teacherAddForm.touched.last_name}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.last_name}
            />
            <CustomSelectInput
              name="gender"
              placeholder="Select gender"
              required
              label="Gender"
              error={teacherAddForm.errors?.gender}
              touched={teacherAddForm.touched.gender}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
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
              error={teacherAddForm.errors?.dob}
              touched={teacherAddForm.touched.dob}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.dob}
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
              error={teacherAddForm.errors?.email}
              touched={teacherAddForm.touched.email}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.email}
            />
            <CustomTextInput
              name="phone"
              placeholder="Enter phone number"
              label="Phone"
              error={teacherAddForm.errors?.phone}
              touched={teacherAddForm.touched.phone}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.phone}
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
              error={teacherAddForm.errors?.address}
              touched={teacherAddForm.touched.address}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.address}
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
              label="Depratment"
              error={teacherAddForm.errors?.department_name}
              touched={teacherAddForm.touched.department_name}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
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
