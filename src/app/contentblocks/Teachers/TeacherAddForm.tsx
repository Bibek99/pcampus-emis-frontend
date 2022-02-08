import React from 'react';
import { useFormik } from 'formik';
import {
  CustomDatePicker,
  CustomSelectInput,
  CustomTextInput,
} from '@app/layout/Forms';
import * as Yup from 'yup';

const teacherAddSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is requied'),
  gender: Yup.string().required('Please select a gender'),
});

export const TeacherAddForm: React.FC<{}> = () => {
  const teacherAddForm = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      date: '',
      email: '',
      phone: '',
      address: '',
    },
    validationSchema: teacherAddSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
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
              name="firstName"
              placeholder="Enter first name"
              required
              label="First Name"
              error={teacherAddForm.errors?.firstName}
              touched={teacherAddForm.touched.firstName}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.firstName}
            />
            <CustomTextInput
              name="middleName"
              placeholder="Enter middle name"
              label="Middle Name"
              error={teacherAddForm.errors?.middleName}
              touched={teacherAddForm.touched.middleName}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.middleName}
            />
            <CustomTextInput
              name="lastName"
              placeholder="Enter last name"
              required
              label="Last Name"
              error={teacherAddForm.errors?.lastName}
              touched={teacherAddForm.touched.lastName}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.lastName}
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
            />
            <CustomDatePicker
              name="date"
              placeholder="Date of birth"
              label="Date of birth"
              error={teacherAddForm.errors?.date}
              touched={teacherAddForm.touched.date}
              onChange={teacherAddForm.handleChange}
              onBlur={teacherAddForm.handleBlur}
              value={teacherAddForm.values.date}
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
