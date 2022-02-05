import { CustomFileUpload } from '@app/layout/Forms';
import React from 'react';

export const StudentsAddView = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">Add Students</h1>
      </div>
      <hr className="border border-gray-300" />
      <CustomFileUpload
        accept={['.csv', '.jpg', '.png', '.pdf']}
        maxFiles={1}
        maxSize={5000 * 1024}
      />
    </div>
  );
};
