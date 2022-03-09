import { CloseIcon } from '@app/elements/icons';
import { PlusIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { AllFiles, FileUploadProps } from '.';

export const CustomMinimalFileUpload: React.FC<FileUploadProps> = (options) => {
  const [files, setFiles] = useState<AllFiles[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const ErroredAcceptedFiles = acceptedFiles.map((file) => ({
        file,
        errors: [],
      }));
      setFiles((_) => [...ErroredAcceptedFiles, ...fileRejections]);
    },
    [files]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    ...options,
  });

  useEffect(() => {
    options.setFieldValue(options.name, acceptedFiles);
  }, [files]);

  const deleteFile = (file: File) => {
    setFiles((currentFiles) =>
      currentFiles.filter((fileWrapper) => fileWrapper.file !== file)
    );
  };

  return (
    <>
      <p className="mb-2 text-sm italic text-gray-700">
        Allowed {options.maxFiles} file(s) to attach.
      </p>
      <div
        {...getRootProps()}
        className="relative rounded-md border-2 border-gray-300 bg-gray-50 p-2 hover:shadow-md"
      >
        <div className="flex h-full w-full items-center justify-center space-x-4">
          <PlusIcon className="h-5 w-5" />
          <span className="">Attach File</span>
          <input {...getInputProps()} className="absolute h-full w-full" />
        </div>
      </div>
      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4">
          {files.map(({ file, errors }, index) => (
            <div key={index}>
              <div
                className={classNames(
                  'flex w-full justify-between rounded-md border border-gray-300 p-4',
                  errors.length > 0 ? 'border-red-300' : 'border-emerald-300'
                )}
              >
                <span>{file.name}</span>
                <button type="button" onClick={() => deleteFile(file)}>
                  <CloseIcon />
                </button>
              </div>
              {errors[0]?.message && (
                <span className="text-sm italic text-red-500">
                  {errors[0]?.message}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
