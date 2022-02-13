import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';

export const AssignmentItem = () => {
  return (
    <div className="flex space-x-4 pt-4">
      <div>Avatar</div>
      <div>Assignment Details</div>
    </div>
  );
};

export const AssignmentView = () => {
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
        {[1, 2, 3, 4].map((assignment, index) => (
          <AssignmentItem key={index} />
        ))}
      </div>
    </div>
  );
};
