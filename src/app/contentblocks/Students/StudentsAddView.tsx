import { UploadIcon } from '@app/elements/icons';
import { Modal } from '@app/layout';
import { CustomFileUpload } from '@app/layout/Forms';
import React, { useState } from 'react';

export const StudentsAddView = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Add Students</h1>
          <button
            type="button"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
            onClick={() => setModalOpen(true)}
          >
            <span>
              <UploadIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Upload CSV File</span>
          </button>
        </div>
        <hr className="border border-gray-300" />
      </div>
      <Modal
        title="Upload CSV File"
        description={
          <CustomFileUpload
            accept={['.csv', '.jpg', '.png', '.pdf']}
            maxFiles={1}
            maxSize={5000 * 1024}
          />
        }
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        primaryButton={
          <button
            type="button"
            className="rounded-md bg-emerald-500 py-2 px-4 text-white"
          >
            Upload
          </button>
        }
        secondaryButton={
          <button
            type="button"
            className="rounded-md border border-red-500 py-2 px-4 text-red-500"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        }
      />
      <span>Text</span>
    </>
  );
};
