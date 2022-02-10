import React from 'react';
import { useFormik } from 'formik';
import {
  CustomDatePicker,
  CustomSelectInput,
  CustomTextInput,
} from '@app/layout/Forms';
import * as Yup from 'yup';
import { useFetchBatch } from '@app/services/user.service';

const studentAddSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is requied'),
  gender: Yup.string().required('Please select a gender'),
});

export const StudentAddForm: React.FC<{}> = () => {
  const studentAddForm = useFormik({
    initialValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      date: '',
      email: '',
      phone: '',
      address: '',
      batch: '',
      section: '',
      department: '',
      rollNo: '',
    },
    validationSchema: studentAddSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mx-auto flex w-full flex-col space-y-4 py-6">
      <p className="text-sm italic text-gray-600">
        Fill the form below to add an individual student to EMIS.
      </p>
      <form onSubmit={studentAddForm.handleSubmit}>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomTextInput
              name="firstName"
              placeholder="Enter first name"
              required
              label="First Name"
              error={studentAddForm.errors?.firstName}
              touched={studentAddForm.touched.firstName}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.firstName}
            />
            <CustomTextInput
              name="middleName"
              placeholder="Enter middle name"
              label="Middle Name"
              error={studentAddForm.errors?.middleName}
              touched={studentAddForm.touched.middleName}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.middleName}
            />
            <CustomTextInput
              name="lastName"
              placeholder="Enter last name"
              required
              label="Last Name"
              error={studentAddForm.errors?.lastName}
              touched={studentAddForm.touched.lastName}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.lastName}
            />
            <CustomSelectInput
              name="gender"
              placeholder="Select gender"
              required
              label="Gender"
              error={studentAddForm.errors?.gender}
              touched={studentAddForm.touched.gender}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
            />
            <CustomDatePicker
              name="date"
              placeholder="Date of birth"
              label="Date of birth"
              error={studentAddForm.errors?.date}
              touched={studentAddForm.touched.date}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.date}
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
              error={studentAddForm.errors?.email}
              touched={studentAddForm.touched.email}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.email}
            />
            <CustomTextInput
              name="phone"
              placeholder="Enter phone number"
              label="Phone"
              error={studentAddForm.errors?.phone}
              touched={studentAddForm.touched.phone}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.phone}
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
              error={studentAddForm.errors?.address}
              touched={studentAddForm.touched.address}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.address}
            />
          </div>
        </section>
        <section className="flex flex-col space-y-6 py-6">
          <h3 className="text-lg font-semibold">Academic Information</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <CustomSelectInput
              name="batch"
              placeholder="Select batch"
              required
              label="Batch"
              error={studentAddForm.errors?.batch}
              touched={studentAddForm.touched.batch}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
            />
            <CustomSelectInput
              name="department"
              placeholder="Select Department"
              required
              label="Department"
              error={studentAddForm.errors?.department}
              touched={studentAddForm.touched.department}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
            />
            <CustomSelectInput
              name="section"
              placeholder="Select section"
              required
              label="Section"
              error={studentAddForm.errors?.section}
              touched={studentAddForm.touched.section}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
            />
            <CustomTextInput
              name="rollNo"
              placeholder="Enter Roll no"
              label="Roll No."
              error={studentAddForm.errors?.rollNo}
              touched={studentAddForm.touched.rollNo}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.rollNo}
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
