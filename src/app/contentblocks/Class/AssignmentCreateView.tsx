import React from 'react';
import { AssignmentCreateForm } from './AssignmentCreateForm';

export const AssignmentCreateView = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-xl font-semibold">Create Assignment</h1>
      <hr className="border border-gray-300" />
      <AssignmentCreateForm />
    </div>
  );
};
