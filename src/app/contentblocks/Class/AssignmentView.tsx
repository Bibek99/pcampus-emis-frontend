import { useFetchAssignments } from '@app/services';
import { PlusIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

export const AssignmentItem = ({ assignment }: { assignment: any }) => {
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
        <Link to={`${assignment.id}`}>
          <div className="flex w-full justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{assignment.title}</h3>
              <p className="text-gray-700">{assignment.description}</p>
              <p className="text-sm text-gray-600">
                Due {moment(assignment.due_date).format('LLL')}
              </p>
            </div>
            <span className="text-gray-600">{assignment.points} Points</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export const AssignmentView = () => {
  const { id } = useParams();
  const { data } = useFetchAssignments(id);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Assignments</h2>
        <Link
          to="create"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <PlusIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Create Assignment</span>
        </Link>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-6 divide-y-2">
        {data?.data.map((assignment: any, index: number) => (
          <AssignmentItem key={index} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};
