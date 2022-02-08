import { SimpleCard } from '@app/components/Card';
import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';

export const DepartmentView = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <Link
          to="create"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <PlusIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Add Department</span>
        </Link>
      </div>
      <hr className="border border-gray-300" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key) => (
          <Link to={`${key}`}>
            <SimpleCard key={key} />
          </Link>
        ))}
      </div>
    </div>
  );
};
