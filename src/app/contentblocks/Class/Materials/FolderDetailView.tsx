import { CustomFileIcon } from '@app/components/FileIcon';
import { UploadIcon } from '@app/elements/icons';
import { SimpleModal } from '@app/layout';
import { RoleBasedRenderer } from '@app/router/guards/RoleBasedRenderer';
import {
  useFetchAllMaterialsInFolder,
  useFetchFolderDetail,
  useMaterialDelete,
} from '@app/services';
import {
  ArrowLeftIcon,
  DownloadIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UploadFilesForm } from '.';

export const FileItem = ({ material }: any) => {
  const fileName = material?.file.split('/').reverse()[0];
  const baseUrl = 'http://localhost:8000';

  const queryClient = useQueryClient();
  const { folderId } = useParams();

  const { mutate: deleteMaterial } = useMaterialDelete({
    onError: () => {
      toast.error('Material Delete Failed');
    },
    onSuccess: () => {
      toast.success('Material Deleted Successfully');
      queryClient.invalidateQueries(['fetch-materials', folderId]);
    },
  });

  return (
    <div className="flex justify-between pt-4">
      <div className="flex flex-row items-center space-x-4">
        <CustomFileIcon fileName={material?.file} />
        <p>{fileName}</p>
      </div>
      <div className="flex space-x-4">
        <a href={`${baseUrl}${material?.file}`} download target="_blank">
          <DownloadIcon className="h-6 w-6" />
        </a>
        <RoleBasedRenderer allowRoles={['TEACHER']}>
          <button
            onClick={() => deleteMaterial(material?.id)}
            className="flex justify-end text-gray-500 hover:text-red-500"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </RoleBasedRenderer>
      </div>
    </div>
  );
};

export const FolderDetailView = () => {
  const [uploadFilesModalOpen, setUploadFilesModalOpen] = useState(false);

  const navigate = useNavigate();
  const { folderId } = useParams();

  const { folderDetail } = useFetchFolderDetail(folderId);
  const { materials } = useFetchAllMaterialsInFolder(folderId);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center justify-center space-x-2"
          onClick={() => navigate('..')}
        >
          <span>
            <ArrowLeftIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Back</span>
        </button>
        <h2 className="flex flex-auto justify-center text-xl font-semibold">
          {folderDetail?.folder_name}
        </h2>
        <RoleBasedRenderer allowRoles={['TEACHER']}>
          <button
            type="button"
            onClick={() => setUploadFilesModalOpen(true)}
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
          >
            <span>
              <UploadIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Upload Files</span>
          </button>
        </RoleBasedRenderer>
      </div>
      <hr className="border border-gray-300" />
      <main className="flex flex-col space-y-6 divide-y-2">
        {materials?.map((material: any, index: number) => (
          <FileItem key={index} material={material} />
        ))}
      </main>
      <SimpleModal
        title="Upload Files"
        isOpen={uploadFilesModalOpen}
        setOpen={setUploadFilesModalOpen}
      >
        <UploadFilesForm setOpen={setUploadFilesModalOpen} />
      </SimpleModal>
    </div>
  );
};
