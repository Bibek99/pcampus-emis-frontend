import { SimpleModal } from '@app/layout';
import { RoleBasedRenderer } from '@app/router/guards/RoleBasedRenderer';
import { useFetchFolders, useFolderDelete } from '@app/services';
import { FolderAddIcon, FolderIcon, TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateFolderForm } from './CreateFolderForm';

export const FolderItem = ({ folder }: any) => {
  const queryClient = useQueryClient();

  const { mutate: deleteFolderItem } = useFolderDelete({
    onError: () => {
      toast.error('Folder Delete Failed');
    },
    onSuccess: () => {
      toast.success('Folder Deleted Successfully');
      queryClient.invalidateQueries(['fetch-folders']);
    },
  });

  return (
    <div className="group flex flex-col items-center justify-center space-y-2">
      <span className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-emerald-100">
        <Link to={`${folder.id}`}>
          <FolderIcon className="h-16 w-16 text-emerald-500" />
        </Link>
        <button
          onClick={() => deleteFolderItem(folder.id)}
          className="absolute -top-4 -right-4 z-[20] hidden rounded-full bg-gray-50 p-4 shadow-sm hover:text-red-500 group-hover:block"
        >
          <TrashIcon className="h-6 w-6" />
        </button>
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
        <RoleBasedRenderer allowRoles={['TEACHER']}>
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
        </RoleBasedRenderer>
      </div>
      <hr className="border border-gray-300" />
      <section>
        <div className="xxl:grid-cols-8 grid grid-cols-2 gap-12 py-6 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-6">
          {folders?.data.map((folder: any, index: number) => (
            <FolderItem key={index} folder={folder} />
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
