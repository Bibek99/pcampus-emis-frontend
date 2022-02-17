import React from 'react';
import { ClassCreateForm } from '.';

export const ClassCreateView = () => {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Class</h1>
      </div>
      <hr className="border border-gray-300" />
      <ClassCreateForm />
    </div>
  );
};
