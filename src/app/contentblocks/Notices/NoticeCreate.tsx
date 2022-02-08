import React from 'react';
import { NoticeCreateForm } from '.';

export const NoticeCreate = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Create Notice</h1>
      <hr className="border border-gray-300" />
      <NoticeCreateForm />
    </div>
  );
};
