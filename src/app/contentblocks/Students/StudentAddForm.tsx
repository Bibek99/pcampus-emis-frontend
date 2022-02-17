import React from 'react';
import { useFormik } from 'formik';
import {
  CustomDatePicker,
  CustomSelectInput,
  CustomTextInput,
} from '@app/components/Forms';
import * as Yup from 'yup';
import {
  useCreateStudentAccount,
  useFetchBatch,
  useFetchDepartment,
  useFetchSection,
} from '@app/services/user.service';
import { toast } from 'react-toastify';

const studentAddSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is requied'),
  gender: Yup.string().required('Please select a gender'),
  roll_no: Yup.number().required('Please enter roll no'),
});

export const StudentAddForm: React.FC<{}> = () => {
  const { mutate: createStudent } = useCreateStudentAccount({
    onError: (error) => {
      toast.error(error);
    },
    onSuccess: () => {
      toast.success('Student Created');
      studentAddForm.resetForm();
      window.scrollTo(0, 0);
    },
  });

  const studentAddForm = useFormik({
    initialValues: {
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      batch: '',
      section: '',
      department_name: '',
      roll_no: '',
    },
    validationSchema: studentAddSchema,
    onSubmit: ({ roll_no, ...rest }) => {
      const newStudent = {
        roll_no: Number(roll_no),
        ...rest,
      };
      createStudent(newStudent);
    },
  });

  const { data: batches } = useFetchBatch();
  const { data: departments } = useFetchDepartment();
  const { data: sections } = useFetchSection();

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
              name="first_name"
              placeholder="Enter first name"
              required
              label="First Name"
              error={studentAddForm.errors?.first_name}
              touched={studentAddForm.touched.first_name}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.first_name}
            />
            <CustomTextInput
              name="middle_name"
              placeholder="Enter middle name"
              label="Middle Name"
              error={studentAddForm.errors?.middle_name}
              touched={studentAddForm.touched.middle_name}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.middle_name}
            />
            <CustomTextInput
              name="last_name"
              placeholder="Enter last name"
              required
              label="Last Name"
              error={studentAddForm.errors?.last_name}
              touched={studentAddForm.touched.last_name}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.last_name}
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
              value={studentAddForm.values.gender}
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
              error={studentAddForm.errors?.dob}
              touched={studentAddForm.touched.dob}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.dob}
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
              options={batches?.data}
              value={studentAddForm.values.batch}
            />
            <CustomSelectInput
              name="department_name"
              placeholder="Select Department"
              required
              label="Department"
              error={studentAddForm.errors?.department_name}
              touched={studentAddForm.touched.department_name}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              options={departments?.data}
              value={studentAddForm.values.department_name}
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
              options={sections?.data}
              value={studentAddForm.values.section}
            />
            <CustomTextInput
              name="roll_no"
              placeholder="Enter Roll no"
              label="Roll No."
              error={studentAddForm.errors?.roll_no}
              touched={studentAddForm.touched.roll_no}
              onChange={studentAddForm.handleChange}
              onBlur={studentAddForm.handleBlur}
              value={studentAddForm.values.roll_no}
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
