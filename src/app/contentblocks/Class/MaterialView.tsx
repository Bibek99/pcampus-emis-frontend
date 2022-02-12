import { DownloadIcon, FolderIcon } from '@heroicons/react/outline';
import React from 'react';

export const FolderItem = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <span className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-emerald-100">
        <FolderIcon className="h-16 w-16 text-emerald-500" />
      </span>
      <p>Folder Name</p>
    </div>
  );
};

export const FileItem = () => {
  return (
    <div className="flex justify-between pt-4">
      <p>File Name.ext</p>
      <span>
        <DownloadIcon className="h-6 w-6" />
      </span>
    </div>
  );
};

export const MaterialView = () => {
  return (
    <div className="flex flex-col space-y-8">
      <section>
        <h3 className="text-xl font-semibold">Folders</h3>
        <div className="xxl:grid-cols-6 grid grid-cols-2 gap-12 py-6 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5">
          {[1, 2, 3, 4, 5, 6, 7].map((folder, index) => (
            <FolderItem key={index} />
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-semibold">Files</h3>
        <div className="flex flex-col space-y-6 divide-y-2 pt-6">
          {[1, 2, 3, 4, 5, 6, 7].map((file, index) => (
            <FileItem key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};
