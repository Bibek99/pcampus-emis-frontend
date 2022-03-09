import { useAuthContext } from '@app/auth/AuthContext';
import { CustomMinimalFileUpload } from '@app/components/Forms';
import { useSubmitAssignment } from '@app/services';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AssignmentSubmitFormProps {
  submissionData?: any;
}

export const AssignmentSubmitForm: React.FC<AssignmentSubmitFormProps> = ({
  submissionData,
}) => {
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);

  const { assignmentId } = useParams();
  const navigate = useNavigate();

  const { mutate: submitAssignment } = useSubmitAssignment(
    {
      onError: () => {
        toast.error('Assignment submit Error!');
      },
      onSuccess: () => {
        toast.success('Assignment submitted successfully!');
        navigate('..');
      },
    },
    assignmentId,
    userId
  );

  const assignmentSubmitForm = useFormik({
    initialValues: {
      student_files: '',
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.student_files.length > 0) {
        const formData = new FormData();
        formData.append('student_files', values.student_files[0]);
        submitAssignment(formData);
      }
    },
  });

  if (submissionData) {
    return (
      <div className="flex flex-col space-y-4">
        <p className="font-semibold">Your submission</p>
        <p>
          <a
            href={`http://localhost:8000${submissionData?.student_files}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {submissionData?.student_files?.split('/').reverse()[0]}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={assignmentSubmitForm.handleSubmit} className="">
      <p className="mb-4 w-full font-semibold">Submit Assignment</p>
      <CustomMinimalFileUpload
        name="student_files"
        label="Student Files"
        maxFiles={1}
        accept={['.jpeg', '.jpg', '.pdf', '.png']}
        setFieldValue={assignmentSubmitForm.setFieldValue}
      />
      <div className="mt-6 flex w-full">
        <button
          type="submit"
          className="w-full flex-auto rounded-md bg-emerald-500 py-2 px-6 text-gray-50 sm:w-32"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
