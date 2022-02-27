import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '@app/auth/AuthContext';
import { useFetchAssignmentDetailsForAStudent } from '@app/services';
import { AssignmentDetailView, AssignmentSubmitForm } from '.';

export const AssignmentSubmitView = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { assignmentData, submissionData } =
    useFetchAssignmentDetailsForAStudent(assignmentId, userId);

  return (
    <div className="flex flex-col space-y-4">
      <AssignmentDetailView assignmentData={assignmentData} />
      <hr className="border border-gray-300" />
      <div className="min-w-max max-w-md pt-4">
        <AssignmentSubmitForm submissionData={submissionData} />
      </div>
    </div>
  );
};
