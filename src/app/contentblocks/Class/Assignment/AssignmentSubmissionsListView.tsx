import {
  useFetchAssignmentDetail,
  useFetchSubmittedDataForAnAssignment,
} from '@app/services';
import React from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentDetailView, SubmissionList } from '.';

export const AssignmentSubmissionsListView = () => {
  const { assignmentId } = useParams();

  const { submittedListData } =
    useFetchSubmittedDataForAnAssignment(assignmentId);
  console.log(submittedListData);

  const { assignmentData } = useFetchAssignmentDetail(assignmentId);

  return (
    <div className="flex flex-col space-y-4">
      <AssignmentDetailView assignmentData={assignmentData} />
      <hr className="border border-gray-300" />
      <SubmissionList submittedListData={submittedListData} />
    </div>
  );
};
