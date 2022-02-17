import React from 'react';
import { DepartmentCreateForm } from '.';

export const DepartmentCreateView = () => {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">Add Department</h1>
      <hr className="border border-gray-300" />
      <DepartmentCreateForm />
    </div>
  );
};
