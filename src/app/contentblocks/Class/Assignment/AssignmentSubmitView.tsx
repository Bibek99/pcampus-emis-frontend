import { useAuthContext } from '@app/auth/AuthContext';
import { useFetchAssignmentDetailsForAStudent } from '@app/services';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import moment from 'moment';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AssignmentSubmitForm } from '.';

export const AssignmentSubmitView = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { assignmentData, submissionData } =
    useFetchAssignmentDetailsForAStudent(assignmentId, userId);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center justify-center space-x-2"
          onClick={() => navigate('..')}
        >
          <span>
            <ArrowLeftIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Back</span>
        </button>
        <h2 className="flex flex-auto justify-center text-xl font-semibold">
          {assignmentData?.title}
        </h2>
      </div>
      <hr className="border border-gray-300" />
      <div className="grid grid-cols-1 gap-6 pb-6 xl:grid-cols-3 xl:divide-x-2">
        <section className="col-span-2 flex flex-col space-y-8 xl:py-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Assignment Details</h3>
            <p className="text-gray-800">{assignmentData?.description}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Provided File:</h3>
            <p>
              <a
                href={`http://localhost:8000${assignmentData?.teacher_files}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {assignmentData?.teacher_files?.split('/').reverse()[0]}
              </a>
            </p>
          </div>
        </section>
        <section className="flex flex-col space-y-8 xl:py-6 xl:pl-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Due Date</h3>
            <p className="text-gray-800">
              {assignmentData?.due_date &&
                moment(assignmentData?.due_date).format('LLL')}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Points</h3>
            <p className="text-gray-800">{assignmentData?.total_points}</p>
          </div>
        </section>
      </div>
      <hr className="border border-gray-300" />
      <div className="min-w-max max-w-md pt-4">
        <AssignmentSubmitForm submissionData={submissionData} />
      </div>
    </div>
  );
};
