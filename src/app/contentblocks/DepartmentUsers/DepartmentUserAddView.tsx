import React from 'react';
import { DepartmentUserAddForm } from './DepartmentUserAddForm';

export const DepartmentUserAddView = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Department Admin</h1>
      </div>
      <hr className="border border-gray-300" />
      <DepartmentUserAddForm />
    </div>
  );
};
