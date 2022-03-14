import { RoleBasedRenderer } from '@app/router/guards/RoleBasedRenderer';
import { useAssignmentDelete, useFetchAssignments } from '@app/services';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AssignmentItem = ({ assignment }: { assignment: any }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteAssignment } = useAssignmentDelete({
    onError: () => {
      toast.error('Assignment Delete Error');
    },
    onSuccess: () => {
      toast.success('Assignment Deleted');
      queryClient.invalidateQueries(['assignments', id]);
    },
  });
  return (
    <div className="flex w-full space-x-6 pt-4">
      <div>
        <Image
          src="https://joeschmoe.io/api/v1/random"
          height={32}
          width={32}
          priority
        />
      </div>
      <div className="flex-auto">
        <div className="flex w-full justify-between">
          <Link to={`${assignment.id}`}>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{assignment.title}</h3>
              <p className="text-gray-700">{assignment.description}</p>
              <p className="text-sm text-gray-600">
                Due {moment(assignment.due_date).format('LLL')}
              </p>
            </div>
          </Link>
          <div className="flex flex-col justify-between">
            <span className="text-gray-600">
              {assignment.total_points} Points
            </span>
            <RoleBasedRenderer allowRoles={['TEACHER']}>
              <button
                onClick={() => deleteAssignment(assignment?.id)}
                className="flex justify-end text-gray-500 hover:text-red-500"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </RoleBasedRenderer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AssignmentView = () => {
  const { id } = useParams();
  const { assignments } = useFetchAssignments(id);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Assignments</h2>
        <RoleBasedRenderer allowRoles={['TEACHER']}>
          <Link
            to="create"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
          >
            <span>
              <PlusIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Create Assignment</span>
          </Link>
        </RoleBasedRenderer>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-6 divide-y-2">
        {assignments?.map((assignment: any, index: number) => (
          <AssignmentItem key={index} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};
