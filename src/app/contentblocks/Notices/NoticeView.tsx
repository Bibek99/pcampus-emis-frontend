import { TableView } from '@app/layout';
import { PencilAltIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';

export const NoticeView = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Notices</h1>
        <Link
          to="create"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <PencilAltIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Create Notice</span>
        </Link>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-4">
        <TableView />
      </div>
    </div>
  );
};
