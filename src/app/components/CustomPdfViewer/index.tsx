import React from 'react';
import PDFViewer from 'pdf-viewer-reactjs';
import { CustomNavigation } from './CustomNavigation';

export interface CustomPdfViewerProps {
  fileName: string;
}

export const CustomPdfViewer: React.FC<CustomPdfViewerProps> = ({
  fileName,
}) => {
  const baseUrl = 'http://localhost:8000';

  return (
    <PDFViewer
      document={{
        url: `${baseUrl + fileName}`,
      }}
      canvasCss="flex justify-center py-6 w-full"
      navigation={CustomNavigation}
    />
  );
};
