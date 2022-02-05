import { CloseIcon, UploadIcon } from '@app/elements/icons';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';

export interface AllFiles {
  file: File;
  errors: FileError[];
}

export const CustomFileUpload = () => {
  const [files, setFiles] = useState<AllFiles[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const ErroredAcceptedFiles = acceptedFiles.map((file) => ({
        file,
        errors: [],
      }));
      setFiles((currentFiles) => [
        ...currentFiles,
        ...ErroredAcceptedFiles,
        ...fileRejections,
      ]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteFile = (file: File) => {
    setFiles((currentFiles) =>
      currentFiles.filter((fileWrapper) => fileWrapper.file !== file)
    );
  };

  return (
    <>
      <div
        {...getRootProps()}
        className="relative rounded-md border-2 border-dashed border-gray-300"
      >
        <div className="flex w-full flex-col items-center justify-center p-12 text-center">
          <UploadIcon className="mb-6 h-12 w-12 text-emerald-500" />
          <p className="text-lg font-semibold leading-10">
            Upload your files here
          </p>
          <p className="text-gray-500">
            Click here or Drag and drop your files to upload.
          </p>
        </div>
        <input {...getInputProps()} className="absolute h-full w-full" />
        {isDragActive ? (
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-gray-50 opacity-90">
            <span className="text-2xl font-semibold text-gray-500">
              Drop your file here
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
      {files.length > 0 && (
        <div className="xxl:grid-cols-3 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {files.map(({ file, errors }, index) => (
            <div
              key={index}
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
          ))}
        </div>
      )}
    </>
  );
};
