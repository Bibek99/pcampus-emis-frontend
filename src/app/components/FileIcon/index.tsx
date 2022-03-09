import React from 'react';
import { DefaultExtensionType, defaultStyles, FileIcon } from 'react-file-icon';

interface FileIconProps {
  fileName: any;
  className?: string;
}

export const CustomFileIcon: React.FC<FileIconProps> = ({
  fileName,
  className,
}) => {
  const fileExt: DefaultExtensionType = fileName?.split('.').reverse()[0];
  return (
    <span className={className ? className : 'h-8 w-8'}>
      <FileIcon extension={fileExt} {...defaultStyles[fileExt]} />
    </span>
  );
};
