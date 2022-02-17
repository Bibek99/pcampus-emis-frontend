import { SimpleModal } from '@app/layout';
import { useFetchFolders } from '@app/services';
import { FolderAddIcon, FolderIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UploadFilesForm } from '.';
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

export const MaterialView = () => {
  const [folderCreateModalOpen, setFolderCreateModalOpen] = useState(false);
  const { id } = useParams();
  const { data: folders } = useFetchFolders(id || '');

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Class Materials</h2>
        <button
          onClick={() => setFolderCreateModalOpen(true)}
          type="button"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <FolderAddIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Create Folder</span>
        </button>
      </div>
      <hr className="border border-gray-300" />
      <section>
        <div className="xxl:grid-cols-8 grid grid-cols-2 gap-12 py-6 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6">
          {folders?.data.map((folder: any, index: number) => (
            <Link key={index} to={`${folder.id}`}>
              <FolderItem folder={folder} />
            </Link>
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
