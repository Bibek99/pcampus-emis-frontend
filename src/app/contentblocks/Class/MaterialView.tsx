import { SimpleModal } from '@app/layout';
import { useFetchFolders } from '@app/services';
import {
  DownloadIcon,
  FolderAddIcon,
  FolderIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CreateFolderForm } from './CreateFolderForm';

export const FolderItem = ({ folder }: any) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <span className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-emerald-100">
        <FolderIcon className="h-16 w-16 text-emerald-500" />
      </span>
      <p>{folder.folder_name}</p>
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
  const [folderCreateModalOpen, setFolderCreateModalOpen] = useState(false);
  const { id } = useParams();
  const { data: folders } = useFetchFolders(id || '');

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Class Materials</h2>
        <div className="flex space-x-4">
          <button
            type="button"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
          >
            <span>
              <UploadIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Upload Files</span>
          </button>
          <button
            onClick={() => setFolderCreateModalOpen(true)}
            type="button"
            className="flex items-center justify-center space-x-2 rounded-md border-2 border-emerald-500 bg-gray-50 px-4 py-2 text-emerald-500"
          >
            <span>
              <FolderAddIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Create Folder</span>
          </button>
        </div>
      </div>
      <hr className="border border-gray-300" />
      <section>
        <h3 className="text-xl font-semibold">Folders</h3>
        <div className="xxl:grid-cols-8 grid grid-cols-2 gap-12 py-6 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6">
          {folders?.data.map((folder: any, index: number) => (
            <FolderItem key={index} folder={folder} />
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
      <SimpleModal
        title="Create Folder"
        isOpen={folderCreateModalOpen}
        setOpen={setFolderCreateModalOpen}
      >
        <CreateFolderForm setOpen={setFolderCreateModalOpen} />
      </SimpleModal>
    </div>
  );
};
